// @flow
import defineType, {
  assertEach,
  assertNodeType,
  assertValueType,
  chain,
} from "./utils";
import { classMethodOrPropertyCommon } from "./es2015";

defineType("AwaitExpression", {
  builder: ["argument"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    argument: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: {
    // todo
  },
});

defineType("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "typeAnnotation", "decorators", "computed"],
  aliases: ["Property"],
  fields: {
    ...classMethodOrPropertyCommon,
    value: {
      validate: assertNodeType("Expression"),
      optional: true,
    },
    definite: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    typeAnnotation: {
      validate: assertNodeType("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true,
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
    },
    readonly: {
      validate: assertValueType("boolean"),
      optional: true,
    },
  },
});

defineType("OptionalMemberExpression", {
  builder: ["object", "property", "computed", "optional"],
  visitor: ["object", "property"],
  aliases: ["Expression"],
  fields: {
    object: {
      validate: assertNodeType("Expression"),
    },
    property: {
      validate: (function() {
        const normal = assertNodeType("Identifier");
        const computed = assertNodeType("Expression");

        return function(node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
      })(),
    },
    computed: {
      default: false,
    },
    optional: {
      validate: assertValueType("boolean"),
    },
  },
});

defineType("OptionalCallExpression", {
  visitor: ["callee", "arguments", "typeParameters"],
  builder: ["callee", "arguments", "optional"],
  aliases: ["Expression"],
  fields: {
    callee: {
      validate: assertNodeType("Expression"),
    },
    arguments: {
      validate: chain(
        assertValueType("array"),
        assertEach(
          assertNodeType("Expression", "SpreadElement", "JSXNamespacedName"),
        ),
      ),
    },
    optional: {
      validate: assertValueType("boolean"),
    },
    typeParameters: {
      validate: assertNodeType(
        "TypeParameterInstantiation",
        "TSTypeParameterInstantiation",
      ),
      optional: true,
    },
  },
});

defineType("Import", {
  aliases: ["Expression"],
});

defineType("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
});

defineType("MatchExpression", {
  visitor: ["clauses", "expression"],
  aliases: ["Expression"],
  fields: {
    clauses: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("MatchClause")),
      ),
    },
  },
});

defineType("MatchClause", {
  visitor: ["pattern", "body", "guard", "initializer"],
  fields: {
    pattern: {
      validate: assertNodeType(
        "ObjectMatchPattern",
        "ArrayMatchPattern",
        "Identifier",
        "NullLiteral",
        "BooleanLiteral",
        "NumericLiteral",
        "StringLiteral",
        "RegExpLiteral",
      ),
    },
    body: {
      validate: assertNodeType("BlockStatement", "Expression"),
    },
  },
});

defineType("MatchGuard", {
  visitor: ["body"],
  fields: {
    body: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("ObjectMatchPattern", {
  visitor: ["children", "restProperty"],
  fields: {
    children: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("MatchProperty")),
      ),
    },
  },
});

defineType("MatchProperty", {
  visitor: ["key", "value", "initializer", "computed"],
  fields: {
    computed: {
      validate: assertValueType("boolean"),
      default: false,
    },
    key: {
      validate: (function() {
        const normal = assertNodeType(
          "Identifier",
          "StringLiteral",
          "NumericLiteral",
        );
        const computed = assertNodeType("Expression");

        return function(node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
      })(),
    },
    value: {
      validate: assertNodeType(
        "ObjectMatchPattern",
        "ArrayMatchPattern",
        "Identifier",
        "NullLiteral",
        "BooleanLiteral",
        "NumericLiteral",
        "StringLiteral",
        "RegExpLiteral",
      ),
    },
  },
});

defineType("ArrayMatchPattern", {
  visitor: ["children", "restElement"],
  fields: {
    children: {
      validate: assertValueType("array"),
    },
  },
});

defineType("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: assertNodeType("Identifier"),
    },
  },
});

defineType("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: assertNodeType("Identifier"),
    },
  },
});
