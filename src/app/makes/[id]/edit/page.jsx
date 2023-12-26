"use client";
import MakesEdit from "@/components/makeEdit";
import makesStore from "@/stores/MakesStore";
import { useParams } from "next/navigation";
import React from "react";

export default function EditMakePage() {
  const { id } = useParams();
  console.log(id, "use params in editMakePage");

  makesStore.setEditMakeId(id);
  console.log(id, "drugi id iz useparams in editMakePage");

  return <MakesEdit />;
}
