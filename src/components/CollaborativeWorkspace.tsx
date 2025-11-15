import React, { useRef } from 'react';
import { useCollaboration, User } from '@/hooks/useCollaboration';

interface LiveCursorProps {
  user: User;
}

interface LiveCursorPropsWithWorkspace extends LiveCursorProps {
  workspaceRef: React.RefObject<HTMLDivElement>;
}

function LiveCursor({ user, workspaceRef }: LiveCursorPropsWithWorkspace) {
  if (!user.cursor || user.id === 'current-user' || !workspaceRef.current) return null;

  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div
      className="pointer-events-none absolute z-50 transition-all duration-150 ease-out"
      style={{
        left: `${user.cursor.x}px`,
        top: `${user.cursor.y}px`,
        transform: 'translate(-2px, -2px)',
      }}
    >
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div
        className="flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-lg"
        style={{ borderColor: user.color, borderWidth: '2px' }}
      >
        <span className="text-sm">{user.avatar}</span>
        {/* eslint-disable-next-line react/forbid-dom-props */}
        <span
          className="text-xs font-medium"
          style={{ color: user.color }}
        >
          {user.name}
        </span>
      </div>
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div
        className="absolute left-0 top-0 h-2 w-2 rounded-full"
        style={{ backgroundColor: user.color }}
      />
    </div>
  );
}

interface PresenceIndicatorProps {
  users: User[];
}

function PresenceIndicator({ users }: PresenceIndicatorProps) {
  const activeUsers = users.filter((u) => u.isActive);

  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/80 p-3 shadow-md backdrop-blur-sm">
      <div className="flex -space-x-2">
        {activeUsers.slice(0, 4).map((user) => (
          // eslint-disable-next-line react/forbid-dom-props
          <div
            key={user.id}
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm"
            style={{ backgroundColor: `${user.color}20` }}
            title={user.name}
          >
            {user.avatar}
          </div>
        ))}
        {activeUsers.length > 4 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium">
            +{activeUsers.length - 4}
          </div>
        )}
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-medium">{activeUsers.length}</span> active
        {activeUsers.length === 1 ? ' user' : ' users'}
      </div>
    </div>
  );
}

export function CollaborativeWorkspace() {
  const { users, sharedContent, updateContent, workspaceRef } = useCollaboration();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(e.target.value);
  };

  return (
    <div className="relative h-full w-full">
      {/* Presence Indicator */}
      <div className="absolute right-4 top-4 z-40">
        <PresenceIndicator users={users} />
      </div>

      {/* Collaborative Workspace */}
      <div
        ref={workspaceRef}
        className="relative h-full w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6"
      >
        {/* Live Cursors - positioned relative to workspace */}
        {users.map((user) => (
          <LiveCursor key={user.id} user={user} workspaceRef={workspaceRef} />
        ))}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Collaborative Workspace
          </h2>
          <p className="text-sm text-gray-600">
            Type and see others' cursors move in real-time
          </p>
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={sharedContent}
            onChange={handleContentChange}
            placeholder="Start typing... Changes sync in real-time with your team!"
            className="h-64 w-full rounded-lg border-2 border-gray-300 bg-white p-4 text-gray-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={10}
          />
          {sharedContent && (
            <div className="mt-2 text-xs text-gray-500">
              {sharedContent.length} characters • Synced with {users.length}{' '}
              {users.length === 1 ? 'user' : 'users'}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg bg-white/60 p-4 backdrop-blur-sm">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">
            ✨ Real-time Features
          </h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• Live cursor tracking</li>
            <li>• Presence indicators</li>
            <li>• Instant content sync</li>
            <li>• Multi-user collaboration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

