require "yaml"
require "json"

config = YAML.load_file("public/admin/config.yml", aliases: true)
errors = []

validate_fields = nil
validate_field = nil

validate_fields = lambda do |value, fields, path|
  return unless value.is_a?(Hash)
  configured = Array(fields).map { |field| field["name"] }.compact
  value.keys.each do |key|
    errors << "UNCONFIGURED #{path}.#{key}" unless configured.include?(key)
  end
  Array(fields).each do |field|
    next unless value.key?(field["name"])
    validate_field.call(value[field["name"]], field, "#{path}.#{field["name"]}")
  end
end

validate_field = lambda do |value, field, path|
  widget = field["widget"]
  if widget == "object"
    validate_fields.call(value, field["fields"], path)
  elsif widget == "list" && value.is_a?(Array)
    if field["types"]
      type_key = field["typeKey"] || "type"
      value.each_with_index do |item, index|
        next unless item.is_a?(Hash)
        type_value = item[type_key]
        type = Array(field["types"]).find { |candidate| candidate["name"] == type_value }
        unless type
          errors << "UNKNOWN_TYPE #{path}[#{index}] #{type_key}=#{type_value.inspect} available=#{Array(field["types"]).map { |candidate| candidate["name"] }.inspect}"
          next
        end
        comparable = item.dup
        comparable.delete(type_key)
        validate_fields.call(comparable, type["fields"], "#{path}[#{index}]")
      end
    elsif field["fields"]
      value.each_with_index do |item, index|
        validate_fields.call(item, field["fields"], "#{path}[#{index}]")
      end
    end
  end
end

Array(config["collections"]).each do |collection|
  if collection["files"]
    Array(collection["files"]).each do |entry|
      file = entry["file"]
      next unless file && File.exist?(file)
      validate_fields.call(JSON.parse(File.read(file)), entry["fields"], file)
    end
  elsif collection["folder"]
    Dir.glob(File.join(collection["folder"], "*.json")).sort.each do |file|
      validate_fields.call(JSON.parse(File.read(file)), collection["fields"], file)
    end
  end
end

if errors.empty?
  puts "Decap config covers all managed JSON fields and variable types."
else
  puts errors.join("\n")
  abort "Decap contract audit failed with #{errors.length} issue(s)."
end
