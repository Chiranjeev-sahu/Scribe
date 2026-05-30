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
    <nav className="bg-background/95 sticky top-16 z-40 -mx-4 border-b px-4 pt-4 backdrop-blur-sm lg:mx-0">
      <ul className="flex">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 cursor-pointer px-2 py-3 text-center text-sm font-medium transition-all md:px-6 ${
              activeTab === tab.id
                ? "bg-linear-to-t from-primary/10 to-transparent text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};
