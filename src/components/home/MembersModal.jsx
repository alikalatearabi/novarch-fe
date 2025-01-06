import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";

const MembersModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Users color="#1c7bff" className="ml-3 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="border-b border-black py-5 flex flex-col gap-5">
              <span className="text-[18px]">پروژه شماره 2</span>
              <span className="text-[13px]">0 عضو تیم</span>
            </DialogTitle>
            <he />
            <DialogDescription>
              هیچ عضوی وجود ندارد.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembersModal;
