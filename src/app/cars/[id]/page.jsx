"use client";
import SingleCar from "@/app/singleCar/page";
import { useParams } from "next/navigation";
import React from "react";

export default function Dynamic() {
  const { id } = useParams();
  console.log(id);
  return <SingleCar />;
}
