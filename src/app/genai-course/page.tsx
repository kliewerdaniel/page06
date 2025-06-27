import Link from 'next/link';
import { allModuleDocs } from 'contentlayer/generated';

interface ModuleDoc {
  title: string;
  weeks: string;
  status: string;
  slug: string;
}

// Define a custom sort order for modules
const customModuleOrder = [
  'orientation',
  'transformer',
  'fine-tune',
  'serving',
  'rag',
  'multimodal-guardrails',
  'mlops',
  'capstone',
];

export default function GenAICourseLanding() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">GEN-AI 4001: Applied Generative AI Engineering</h1>
      <p className="text-lg mb-8">
        Welcome to GEN-AI 4001! This course provides a comprehensive deep dive into the engineering aspects of generative AI, from foundational models to advanced deployment and governance.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Syllabus</h2>
      <p>
        <Link href="/genai-course/syllabus" className="text-blue-600 hover:underline">
          View the full course syllabus
        </Link>
      </p>


      <h2 className="text-2xl font-semibold mt-8 mb-4">Course Modules</h2>
      <ul className="space-y-2 py-4">
        {((allModuleDocs as ModuleDoc[]) || [])
          .sort((a: ModuleDoc, b: ModuleDoc) => {
            const aIndex = customModuleOrder.indexOf(a.slug);
            const bIndex = customModuleOrder.indexOf(b.slug);

            if (aIndex === -1 && bIndex === -1) {
              return a.title.localeCompare(b.title); // Alphabetical for uncategorized
            }
            if (aIndex === -1) return 1; // b comes first if a is uncategorized
            if (bIndex === -1) return -1; // a comes first if b is uncategorized

            return aIndex - bIndex;
          })
          .map((module: ModuleDoc) => (
            <li key={module.slug}>
              <Link href={`/genai-course/modules/${module.slug}`} className="text-blue-600 hover:underline">
                {module.title} ({module.weeks})
              </Link>
            </li>
          ))}
      </ul>
      <p className="text-lg mt-8 mb-8">
        This course is offered completely free of charge! If you find value in this content and would like to support the creator, you can{' '}
        <a href="https://www.paypal.com/ncp/payment/H4FUU55N9V7CW" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          send a tip via PayPal
        </a>. Your support is greatly appreciated!
      </p>

    </div>
  );
}
