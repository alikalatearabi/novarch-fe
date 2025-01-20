import { House, Globe, Map, Clock, ScanEye, NotebookPen } from "lucide-react";

export const sidebarItems = {
  links: [
    { label: "داشبورد", href: "/", icon: House },
    { label: "عکس ها", href: "/images", icon: Globe },
    {
      label: "نقشه ها",
      href: "/sheets",
      icon: Map,
    },
    { label: "تایم لپس ها", href: "/timelapses", icon: Clock },
    { 
      label: "مدیریت پروژه", 
      href: "https://pt.novaarchai.com", 
      icon: NotebookPen, 
      external: true // Optional: For differentiating external links
    },
    // { label: "عکس برداری", href: "#captures", icon: ScanEye },
    // { label: "نت برداری", href: "#feildNotes", icon: NotebookPen },
  ],
  // extras: (
  //   <div>
  //     <SideBarButton icon={MoreHorizontal} className="flex gap-2">بیشتر</SideBarButton>
  //   </div>
  // ),
};
