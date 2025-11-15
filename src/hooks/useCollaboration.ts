import { useState, useEffect, useCallback, useRef } from 'react';

export interface User {
  id: string;
  name: string;
  color: string;
  avatar: string;
  cursor: { x: number; y: number } | null;
  isActive: boolean;
}

export interface CollaborationState {
  users: User[];
  sharedContent: string;
}

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
];

const NAMES = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan'];
const EMOJIS = ['👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🔬', '👩‍🔬', '🧑‍🔬'];

// Simulate real-time collaboration with mock users
export function useCollaboration() {
  const [users, setUsers] = useState<User[]>([]);
  const [sharedContent, setSharedContent] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const mouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  // Initialize current user
  useEffect(() => {
    const user: User = {
      id: 'current-user',
      name: 'You',
      color: COLORS[0],
      avatar: EMOJIS[0],
      cursor: null,
      isActive: true,
    };
    setCurrentUser(user);
    setUsers([user]);
  }, []);

  // Simulate other users joining and moving
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) => {
        // Add a new mock user occasionally (max 3 mock users)
        if (prev.length < 4 && Math.random() > 0.7) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: NAMES[prev.length - 1] || 'Guest',
            color: COLORS[prev.length] || COLORS[0],
            avatar: EMOJIS[prev.length - 1] || '👤',
            cursor: null,
            isActive: true,
          };
          return [...prev, newUser];
        }

        // Simulate cursor movements for mock users
        return prev.map((user) => {
          if (user.id === 'current-user') return user;
          
          // Randomly move cursors
          if (Math.random() > 0.5) {
            return {
              ...user,
              cursor: {
                x: Math.random() * (workspaceRef.current?.clientWidth || 800),
                y: Math.random() * (workspaceRef.current?.clientHeight || 600),
              },
              isActive: true,
            };
          }
          return user;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track current user's mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!workspaceRef.current) return;
    
    const rect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === 'current-user'
          ? { ...user, cursor: { x, y }, isActive: true }
          : user
      )
    );
  }, []);

  // Set up mouse tracking
  useEffect(() => {
    if (!workspaceRef.current) return;

    const workspace = workspaceRef.current;
    mouseMoveRef.current = handleMouseMove;
    workspace.addEventListener('mousemove', handleMouseMove);

    return () => {
      workspace.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Handle content updates (simulate real-time sync)
  const updateContent = useCallback((content: string) => {
    setSharedContent(content);
    // Simulate other users also typing
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id !== 'current-user' && Math.random() > 0.8
            ? { ...user, isActive: true }
            : user
        )
      );
    }, 500);
  }, []);

  return {
    users,
    currentUser,
    sharedContent,
    updateContent,
    workspaceRef,
  };
}

