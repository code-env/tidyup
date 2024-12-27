import { motion } from "motion/react";
import { FolderTree, Zap, Shield, Terminal } from "lucide-react";

const features = [
  {
    name: "Smart Categorization",
    description:
      "Automatically sorts files into appropriate categories based on file types.",
    icon: FolderTree,
  },
  {
    name: "Lightning Fast",
    description:
      "Organize hundreds of files in seconds with efficient processing.",
    icon: Zap,
  },
  {
    name: "Non-destructive",
    description:
      "Safe operation with built-in safeguards to prevent accidental file loss.",
    icon: Shield,
  },
  {
    name: "Simple CLI",
    description: "Easy to use command-line interface with intuitive commands.",
    icon: Terminal,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function Features() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Powerful file organization made simple
          </p>
        </motion.div>
        <motion.div
          className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={itemVariants}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}
