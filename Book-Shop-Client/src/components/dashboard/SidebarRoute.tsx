import { NavLink } from "react-router-dom";

const SidebarRoute = ({ path, text, icons }: any) => {
  return (
    <NavLink
      to={`${path}`}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2  transition-colors duration-300 transform  hover:bg-[#00306019]   hover:text-gray-700 ${
          isActive ? "bg-[#00306019]  text-gray-700" : "text-gray-600"
        }`
      }
    >
      {icons}

      <span className="mx-4 font-medium">{text}</span>
    </NavLink>
  );
};

export default SidebarRoute;
