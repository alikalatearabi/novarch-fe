import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectImageBrightness,
  selectImageShadow,
  selectImageSharpness,
  RsetImageBrightness,
  RsetImageShadow,
  RsetImageSharpness,
} from "@/slices/imageSlices";
import { Slider } from "@/components/ui/slider";

const ImageBrightnessDrop = () => {
  const dispatch = useDispatch();
  const [autoEnhance, setAutoEnhance] = useState(false);

  const imageBrightness = useSelector(selectImageBrightness);
  const imageShadow = useSelector(selectImageShadow);
  const imageSharpness = useSelector(selectImageSharpness);

  return (
    <div id="dropContainer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Sun />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-4 space-y-4">
          <div className="text-end flex flex-col gap-2">
            <label className="text-sm font-medium">روشنایی</label>
            <SliderComponent
              value={imageBrightness}
              onChange={(value) => dispatch(RsetImageBrightness(value))}
              min={0}
              max={100}
            />
          </div>
          <div className="text-end">
            <label className="text-sm font-medium">سایه</label>
            <SliderComponent
              value={imageShadow}
              onChange={(value) => dispatch(RsetImageShadow(value))}
              min={0}
              max={100}
            />
          </div>
          <div className="text-end">
            <label className="text-sm font-medium">وضوح</label>
            <SliderComponent
              value={imageSharpness}
              onChange={(value) => dispatch(RsetImageSharpness(value))}
              min={0}
              max={100}
            />
          </div>
          <div className="flex items-center justify-between">
            <Switch checked={autoEnhance} onCheckedChange={(checked) => setAutoEnhance(checked)} />
            <label className="text-sm font-medium">بهبود خودکار</label>
          </div>
          <Button
            variant="outline"
            className="w-full rounded-2xl mt-2"
            onClick={() => {
              dispatch(RsetImageBrightness(50));
              dispatch(RsetImageShadow(0));
              dispatch(RsetImageSharpness(50));
              setAutoEnhance(false);
            }}
          >
            تنظیمات اولیه
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

//should fix this
const SliderComponent = ({ value, onChange, min = 0, max = 100 }) => {
  const valuePercentage = (value / max) * 100; // Calculate percentage based on the current value

  return (
    <div className="w-full">
      <Slider
        min={min}
        max={max}
        // defaultValue={[value]}
        // onChange={(e) => onChange(Number(e.target.value))}
        value={[value]}
        onValueChange={(newValue) => onChange(newValue[0])}
        className="mt-3"
        // style={{
        //   background: `
        //       linear-gradient(
        //         to right,
        //         #2563eb 0%,
        //         #2563eb ${valuePercentage}%,
        //         #d1d5db ${valuePercentage}%
        //       )
        //     `,
        //   backgroundSize: "100% 100%",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default ImageBrightnessDrop;
