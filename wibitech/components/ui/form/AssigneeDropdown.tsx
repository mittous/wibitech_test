import React, { useState } from 'react';
import ImageWrapper from '../ImageWrapper';

interface AssigneeDropdownProps {
  users: string[];
  value: string;
  onChange: (value: string) => void;
}

const AssigneeDropdown: React.FC<AssigneeDropdownProps> = ({ users, value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <div className="relative flex-1">
      <button
        type="button"
        className="w-full flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 justify-between"
        onClick={() => setShowDropdown(v => !v)}
      >
        {value || 'Assign to'}
        <ImageWrapper src="/DownArrow_Icon.svg" alt="down" width={16} height={16} isSvg={true} />
      </button>
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow z-10 max-h-[150px] overflow-y-auto">
          {users.length === 0 && (
            <div className="px-4 py-2 text-gray-400 dark:text-gray-300">No users</div>
          )}
          {users.map(username => (
            <div
              key={username}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-700 dark:text-gray-200"
              onClick={() => {
                onChange(username);
                setShowDropdown(false);
              }}
            >
              {username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneeDropdown; 