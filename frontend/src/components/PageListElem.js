import React from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';

const PageListElem = ({ page, level, toggleExpand, expandedPages, onContextMenu }) => {
    const hasChildren = Array.isArray(page.children) && page.children.length > 0;
    const isExpanded = expandedPages.includes(page._id);

    return (
        <div className="sidebar-item" onContextMenu={(e) => { e.stopPropagation(); onContextMenu(e, page); }}>
            <div
                className="page-list-elem"
                style={{ paddingLeft: `${level * 8}px`, cursor: hasChildren ? 'pointer' : 'default' }}
                onClick={() => hasChildren && toggleExpand(page._id)}
            >
                {hasChildren ? <Dropdown isOpen={isExpanded} /> : 
                  <text>📄</text>
                }
                <NavLink className="page-link" to={`/page/${page._id}`}>
                    {page.title}
                </NavLink>
            </div>
            {isExpanded && hasChildren && (
                <div>
                    {page.children.map(child => (
                        <PageListElem
                            key={child._id}
                            page={child}
                            level={level + 1}
                            toggleExpand={toggleExpand}
                            expandedPages={expandedPages}
                            onContextMenu={onContextMenu}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PageListElem;
