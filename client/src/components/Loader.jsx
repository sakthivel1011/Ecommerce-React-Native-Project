import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ size = 24, text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Loader2
        className={`animate-spin text-primary`}
        style={{ width: size, height: size }}
      />
      {text && (
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
