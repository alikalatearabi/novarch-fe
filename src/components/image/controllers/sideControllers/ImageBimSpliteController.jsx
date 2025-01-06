import { Rotate3D, SquareSplitHorizontal } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectImageSplitView, RsetImageSplitView } from "@/slices/imageSlices";

const controllerData = [
  {
    icon: <Rotate3D />,
  },
  {
    icon: <SquareSplitHorizontal />,
  },
];

const ImageBimSpliteController = () => {
  const dispatch = useDispatch();
  const imageSplitView = useSelector(selectImageSplitView);

  const handleDrop = (index) => {
    // IBM
    if (index === 0) {
    }

    // splitView
    if (index === 1) {
      dispatch(RsetImageSplitView(true));
    }
  };
  return (
    <div
      id="controllerContainer"
      className="inline-flex flex-col gap-3 border shadow p-2 rounded-xl bg-white"
    >
      {controllerData.map((item, index) => {
        return (
          <div
            id="share"
            className="cursor-pointer hover:text-blue-400"
            key={index}
            onClick={() => handleDrop(index)}
          >
            {index === 0 ? (
              <div className="text-center">
                <span>{item.icon}</span>
                <span className="text-[12px] font-bold">BIM</span>
              </div>
            ) : (
              <span>{item.icon}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageBimSpliteController;
