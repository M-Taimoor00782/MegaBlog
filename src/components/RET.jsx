import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 font-medium text-gray-300">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Editor
            apiKey="9p8kr051ct75ary17banydjznoet8clqm3in7o1g8hokxgai"
            value={field.value}                               
            onEditorChange={(content) => field.onChange(String(content || ""))} 
            init={{
              height: 300,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview",
                "anchor searchreplace visualblocks code fullscreen",
                "insertdatetime media table code help wordcount",
              ],
              toolbar:
                "undo redo | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
            }}
          />
        )}
      />
    </div>
  );
}
