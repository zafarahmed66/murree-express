import { Drawer, Label, Textarea } from "flowbite-react";
import { FaRobot } from "react-icons/fa";

import { useState } from "react";

export function ChatAIDrawer() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md cursor-pointer"
        >
          <FaRobot />
          <span className="hidden md:block"> Ask AI</span>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setOpen(false)}
        className="w-full max-w-xs"
        position="right"
      >
        <Drawer.Header title="CHAT BOT" titleIcon={() => <></>} />
        <Drawer.Items>
          <form action="#" className="mt-5">
            <div className="space-y-4">
              <div>
                <Label htmlFor="message" className="block mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hello there"
                  rows={4}
                />
              </div>
            </div>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
