export const JSON_SCHEMA = {
    "type": "object",
    "properties": {
        "children": {
            "type": "array",
            "items": {
                "$ref": "#/$defs/UiBlock"
            }
        }
    },
    "required": ["children"],
    "additionalProperties": false,
    "$defs": {
        "UiBlock": {
            "anyOf": [
                // {
                //     "$ref": "#/$defs/{组件名称}"
                // }
            ] as { $ref: string }[]
        },
        // 组件的JSON Schema
        // "{组件名称}": {
        //     "type": "object",
        //     "properties": {

        //     }
        // }
    
    } as Record<string, any>
}