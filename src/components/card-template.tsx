import { searchFood } from "@/functions/eatCycle";
import DateIcon from "@/icons/DateIcon";
import SearchIcon from "@/icons/SearchIcon";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";

export type CardTemplateProps = {
  title: string;
  date?: string;
  button?: string;
  onClickButton?: () => void;
};

export default function CardTemplate(props: CardTemplateProps) {
  return (
    <div className="p-[30px] bg-[linear-gradient(181.35deg,rgba(255,255,255,0.5)1.15%,rgba(255,255,255,0)_98.91%)] backdrop-sepia-[blur(35px)] rounded-[30px] ">
      <h1>{props.title}</h1>
      {props.date && (
        <div className="mt-1 flex items-center gap-2">
          <DateIcon />
          <div className="text-iconInput">Data on {props.date}</div>
        </div>
      )}

      {props.button && (
        <button
          className="bg-primary w-full p-3 rounded-[16px] mt-5"
          onClick={props.onClickButton}
        >
          {props.button}
        </button>
      )}
    </div>
  );
}
