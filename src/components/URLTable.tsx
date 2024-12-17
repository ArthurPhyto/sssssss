import React, { useState } from 'react';
import { RandomURL } from '../types';
import { Link2, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { Button } from './common/Button';
import { EditURLDialog } from './EditURLDialog';
import { APP_CONFIG } from '../config/constants';

interface URLTableProps {
  urls: RandomURL[];
  onDelete: (id: string) => void;
}

export const URLTable = ({ urls, onDelete }: URLTableProps) => {
  const [editingUrl, setEditingUrl] = useState<RandomURL | null>(null);

  const getFullUrl = (path: string) => {
    return `${APP_CONFIG.BASE_URL}/redirect/${path}`;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Random URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target URLs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Traffic Split
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.map((url) => (
              <tr key={url.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Link2 size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{url.path}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={getFullUrl(url.path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-orange-600 hover:text-orange-700 flex items-center space-x-1"
                      >
                        <span>{getFullUrl(url.path)}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {url.targets.map((target) => (
                      <div key={target.id} className="text-sm">
                        <a
                          href={target.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                        >
                          <span>{target.url}</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {url.targets.map((target) => (
                      <div key={target.id} className="flex items-center space-x-2">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${target.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-12">
                          {target.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingUrl(url)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(url.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUrl && (
        <EditURLDialog
          url={editingUrl}
          isOpen={!!editingUrl}
          onClose={() => setEditingUrl(null)}
        />
      )}
    </>
  );
};