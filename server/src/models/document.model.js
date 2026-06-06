const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "workspaceId is required"],
    },

    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },

    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["note", "summary", "mindmap", "flowchart", "mermaid", "manual"],
      default: "manual",
    },

    generatedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    tags: {
    type: [String],
    default: []
},

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

documentSchema.index({ title: "text", content: "text" });
documentSchema.index({ workspaceId: 1, folderId: 1 });
documentSchema.index({ workspaceId: 1, isArchived: 1 });

const documentModel = mongoose.model("Document",documentSchema);

module.exports = documentModel;
