/**
 * Generates TypeScript type definition from a JSON string
 * @param jsonString The JSON string to convert to TypeScript type definition
 * @param generateNestedTypes If true, generates separate type definitions for nested objects (default: false)
 * @returns A string containing the TypeScript type definition
 */
export function jsonToTypeScript(
  jsonString: string,
  generateNestedTypes = false,
): string {
  try {
    const data = JSON.parse(jsonString);
    const typeMap = new Map<string, string>();
    const rootType = generateTypeDefinition(
      data,
      "RootType",
      "",
      generateNestedTypes,
      typeMap,
    );

    if (!generateNestedTypes) {
      return rootType;
    }

    // Combine all type definitions
    const typeDefinitions = Array.from(typeMap.entries())
      .map(([name, definition]) => `type ${name} = ${definition};`)
      .join("\n\n");

    return `${typeDefinitions}\n\ntype RootType = ${rootType};`;
  } catch (error) {
    throw new Error(
      `Invalid JSON string: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}

function areObjectsStructurallySimilar(obj1: unknown, obj2: unknown): boolean {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return typeof obj1 === typeof obj2;
  }
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    return true; // Consider arrays similar if they're both arrays
  }
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1 || {}).sort();
  const keys2 = Object.keys(obj2 || {}).sort();

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key, index) => {
    const val1 = (obj1 as any)[key];
    const val2 = (obj2 as any)[keys2[index]];
    return typeof val1 === typeof val2;
  });
}

function findCommonType(
  values: unknown[],
  typeName: string,
  generateNestedTypes: boolean,
  typeMap: Map<string, string>,
): string {
  if (values.length === 0) return "any";

  const types = new Set(values.map(v => typeof v));
  if (types.size === 1) {
    const type = types.values().next().value;
    if (type === "object") {
      if (values.every(v => Array.isArray(v))) {
        // Handle arrays
        const flattenedItems = (values as any[][]).flat();
        if (flattenedItems.length === 0) return "any[]";
        const itemType = generateTypeDefinition(
          flattenedItems[0],
          `${typeName}Item`,
          "",
          generateNestedTypes,
          typeMap,
        );
        return `${itemType}[]`;
      }

      // Find a representative object structure
      const objects = values.filter(
        v => v !== null && !Array.isArray(v),
      ) as object[];
      if (objects.length === 0) return "object";

      const representativeObj = objects[0];
      const similarObjects = objects.filter(obj =>
        areObjectsStructurallySimilar(representativeObj, obj),
      );

      if (similarObjects.length === objects.length) {
        return generateTypeDefinition(
          representativeObj,
          typeName,
          "",
          generateNestedTypes,
          typeMap,
        );
      }
    }
    return type!;
  }

  // Handle mixed types
  const uniqueTypes = new Set<string>();
  values.forEach(value => {
    if (value === null) {
      uniqueTypes.add("null");
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        uniqueTypes.add(
          `${findCommonType(value, typeName, generateNestedTypes, typeMap)}[]`,
        );
      } else {
        uniqueTypes.add(
          generateTypeDefinition(
            value,
            typeName,
            "",
            generateNestedTypes,
            typeMap,
          ),
        );
      }
    } else {
      uniqueTypes.add(typeof value);
    }
  });

  return Array.from(uniqueTypes).join(" | ");
}

function generateTypeDefinition(
  value: unknown,
  typeName: string,
  indent = "",
  generateNestedTypes: boolean,
  typeMap: Map<string, string>,
): string {
  if (value === null) return "null";

  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "undefined":
      return "undefined";
    case "object":
      if (Array.isArray(value)) {
        if (value.length === 0) return "any[]";
        return `${findCommonType(
          value,
          typeName,
          generateNestedTypes,
          typeMap,
        )}[]`;
      }

      const properties = Object.entries(value)
        .map(([key, val]) => {
          const propertyTypeName = `${typeName}${
            key.charAt(0).toUpperCase() + key.slice(1)
          }`;
          const propertyType = generateTypeDefinition(
            val,
            propertyTypeName,
            indent + "  ",
            generateNestedTypes,
            typeMap,
          );
          return `${indent}  ${key}: ${propertyType};`;
        })
        .join("\n");

      const objectType = `{\n${properties}\n${indent}}`;

      if (generateNestedTypes && typeName !== "RootType") {
        typeMap.set(typeName, objectType);
        return typeName;
      }

      return objectType;
    default:
      return "any";
  }
}
