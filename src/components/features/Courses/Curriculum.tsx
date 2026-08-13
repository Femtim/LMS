
import { useState } from "react";
import { type Module } from "../../../types";

function Curriculum({ mod, defaultOpen = false }: { mod: Module; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-5 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer border-none text-left"
      >
        <span className="font-semibold text-gray-800 text-sm">{mod.title}</span>
        <span
          className="text-gray-400 text-lg inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          
        </span>
      </button>

      {open && mod.lessons && (
        <div className="border-t border-gray-100">
          {mod.lessons.map((lesson, i) => (
            <div key={i} className="flex justify-between items-center px-5 py-3 bg-gray-50 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#9ca3af">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className={`text-sm ${lesson.free ? "text-blue-600 underline cursor-pointer" : "text-gray-600"}`}>
                  {lesson.title}
                </span>
                {lesson.free && (
                  <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                    Free
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 font-mono shrink-0 ml-4">{lesson.duration}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Curriculum;