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
    <nav className="bg-background/95 lg-mx-0 sticky top-16 z-40 -mx-4 border-b px-4 pt-4 backdrop-blur-sm">
      <ul className="flex divide-x">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 cursor-pointer px-2 py-3 text-center text-sm font-medium transition-colors md:px-6 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};
