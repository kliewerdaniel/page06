// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var ModuleDoc = defineDocumentType(() => ({
  name: "ModuleDoc",
  filePathPattern: `modules/*/page.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    weeks: { type: "string", required: true },
    status: { type: "string", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/")[doc._raw.flattenedPath.split("/").length - 2]
    }
  }
}));
var JournalDoc = defineDocumentType(() => ({
  name: "JournalDoc",
  filePathPattern: `journal/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").pop()
    }
  }
}));
var SyllabusDoc = defineDocumentType(() => ({
  name: "SyllabusDoc",
  filePathPattern: `syllabus.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    weeks: { type: "string", required: true },
    status: { type: "string", required: true }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/app/genai-course",
  documentTypes: [ModuleDoc, JournalDoc, SyllabusDoc],
  mdx: {
    remarkPlugins: [],
    // Removed remarkMath
    rehypePlugins: []
    // Removed rehypeKatex
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-3VCEYEAH.mjs.map
