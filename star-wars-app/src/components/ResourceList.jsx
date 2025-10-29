import { useState } from 'react';
import './ResourceList.css';

const ResourceList = ({ resources, type, fields }) => {
  const [selectedResource, setSelectedResource] = useState(null);

  const formatFieldName = (fieldName) => {
    return fieldName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatFieldValue = (value) => {
    if (value === 'unknown' || value === 'n/a') {
      return <span className="unknown-value">Unknown</span>;
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  if (resources.length === 0) {
    return (
      <div className="no-resources">
        <p>No {type}s found for this film.</p>
      </div>
    );
  }

  return (
    <div className="resource-list-container">
      <div className="resource-grid">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="resource-card"
            onClick={() => setSelectedResource(selectedResource === index ? null : index)}
          >
            <h3 className="resource-name">{resource.name || resource.title}</h3>
            <div className={`resource-details ${selectedResource === index ? 'expanded' : ''}`}>
              {fields.slice(1).map(field => (
                <div key={field} className="resource-field">
                  <span className="field-label">{formatFieldName(field)}:</span>
                  <span className="field-value">{formatFieldValue(resource[field])}</span>
                </div>
              ))}

              {/* Show additional fields when expanded */}
              {selectedResource === index && (
                <div className="additional-fields">
                  {Object.entries(resource)
                    .filter(([key]) => !fields.includes(key) && !['url', 'created', 'edited', 'films', 'people', 'residents', 'characters', 'planets', 'starships', 'vehicles', 'species', 'pilots', 'homeworld'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="resource-field">
                        <span className="field-label">{formatFieldName(key)}:</span>
                        <span className="field-value">
                          {Array.isArray(value) ? value.length : formatFieldValue(value)}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="expand-hint">
              {selectedResource === index ? '▲ Click to collapse' : '▼ Click for more details'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
