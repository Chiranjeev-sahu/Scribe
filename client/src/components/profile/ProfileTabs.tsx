interface ProfileTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export const ProfileTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: ProfileTabsProps) => {
  return (
    <nav className="border-b pt-4">
      <ul className="flex divide-x">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 cursor-pointer px-6 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-chart-2 bg-gray-100"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};
