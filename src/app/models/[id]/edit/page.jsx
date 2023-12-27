"use client";
import ModelEdit from "@/components/modelsEdit/page";
import modelsStore from "@/stores/ModelsStore";
import { useParams } from "next/navigation";
import React from "react";

export default function EditModelPage() {
  const { id } = useParams();
  console.log(id, "use params in editModelPage");

  modelsStore.setEditModelId(id);

  return <ModelEdit />;
}
