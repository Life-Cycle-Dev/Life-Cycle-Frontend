import React from "react";
import BackIcon from "../icons/BackIcon";

type HeaderBarProps = {
  headerName: string;
  backRoute?: string;
};

export default function HeaderBar(props: HeaderBarProps) {
  const { headerName, backRoute } = props;
  return (
    <div className="fixed flex  bg-background p-5 w-full gap-4 items-center z-30">
      <BackIcon backRoute={backRoute} />
      <h2 className="text-textWhite font-medium	">{headerName}</h2>
    </div>
  );
}
