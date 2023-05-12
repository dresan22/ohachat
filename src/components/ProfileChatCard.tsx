import { useChatStore } from "../store/store";
import { User } from "../types/users";

export function ProfileChatCard({ user }: { user: User }) {
  const setChatPartner = useChatStore((state) => state.setChatPartner);
  const handleClick = () => {
    console.log("clicked");
    setChatPartner(user);
  };
  return (
    <button className=" grid grid-cols-1 " onClick={handleClick}>
      <div className="my-2 flex items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <div className="ml-3 ">
          <p className="text-sm font-bold  text-gray-900">
            {user.first_name} {user.last_name}
          </p>
          <div className="flex  text-sm text-gray-500">
            <span>{user.email}</span>
          </div>
        </div>
        <time className="ml-auto flex  text-sm text-gray-500">
          <span>12:00</span>
        </time>
      </div>
    </button>
  );
}