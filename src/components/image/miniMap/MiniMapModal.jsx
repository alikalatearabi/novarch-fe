import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { DtPicker } from "react-calendar-datetime-picker";

const MiniMapModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div
            id="filter-btn"
            className="border px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100"
          >
            <span>
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <span className="text-[15px]">فیلتر</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <>
            {checkBoxData.map((item, index) => {
              return ( 
                <div key={index}  id={item.id} className="flex justify-start items-center gap-5 border-b py-3">
                  <Checkbox key={index} id={item.id} />
                  <label
                    htmlFor={item.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2"
                  >
                    <span>{item.label}</span>
                    <span>{item.sub}</span>
                  </label>
                </div>
              );
            })}
            <div>
              <DtPicker
                inputClass="bg-white text-white font-extrabold ali"
                // placeholder={moment(currentOrder.dateToBargiri).format("jYYYY/jMM/jDD")}
                // minDate={MinTime}
                // maxDate={maxDate}
                onChange={(e) => {
                  if (e) {
                    // Convert Solar Hijri date to Gregorian
                    // const gregorianDate = solarToGregorian(`${e.year}-${e.month}-${e.day}`);
                    // Get the current date and time
                    // Add 24 hours to the current date
                    // dispatch(RsetcompanyTransferDate(gregorianDate));
                  }
                }}
                local="fa"
                showWeekend
              />
            </div>
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MiniMapModal;
