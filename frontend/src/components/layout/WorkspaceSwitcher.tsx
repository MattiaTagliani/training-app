interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  selectedWorkspaceId: string;
  onWorkspaceChange: (workspaceId: string) => void;
}

export default function WorkspaceSwitcher({
  workspaces,
  selectedWorkspaceId,
  onWorkspaceChange,
}: WorkspaceSwitcherProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="workspace-select"
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-foreground/60"
      >
        Workspace
      </label>

      <select
        id="workspace-select"
        value={selectedWorkspaceId}
        onChange={(event) => onWorkspaceChange(event.target.value)}
        className="w-full cursor-pointer rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:bg-white/15 focus:border-white/30 focus:ring-2 focus:ring-white/10"
      >
        <option value="all" className="bg-white text-foreground">
          All Workspaces
        </option>

        {workspaces.map((workspace) => (
          <option
            key={workspace.id}
            value={workspace.id}
            className="bg-white text-foreground"
          >
            {workspace.name}
          </option>
        ))}
      </select>
    </div>
  );
}
