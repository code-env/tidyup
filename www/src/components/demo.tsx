import { motion } from "motion/react";

export function Demo() {
  return (
    <div
      id="demo"
      className="bg-gradient-to-t from-gr1 to-gr2 border rounded-md p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="size-full"
      >
        <div className="flex items-center space-x-1 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="font-mono text-sm text-neutral-700">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-bold text-green-500">
              <span className="font-bold text-2xl">→</span> Downloads
              <span className="text-primary ml-2">tidyup .</span>
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-4"
          >
            🔍 Scanning directory...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            📦 Found 127 files
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            🎯 Organizing files by type...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
          >
            ✨ Created categories:
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 5.5 }}
            className="ml-4"
          >
            📸 Images (43 files)
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 6.5 }}
            className="ml-4"
          >
            📄 Documents (35 files)
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 7.5 }}
            className="ml-4"
          >
            🎵 Audio (22 files)
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 8.5 }}
            className="ml-4"
          >
            🎬 Video (15 files)
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 9.5 }}
            className="ml-4"
          >
            💾 Archives (12 files)
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 10.5 }}
            className="ml-4"
          >
            ✅ All done! Your files are now organized.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
