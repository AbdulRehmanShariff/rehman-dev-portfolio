import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { RESUME_PATH, RESUME_FILENAME } from '../../../constants/resumeConstants';
import './ResumeModal.css';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="resume-modal__overlay" onClick={onClose}>
      <div
        className="resume-modal__container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Rehman Shariff Resume PDF Preview"
      >
        {/* Modal Header */}
        <header className="resume-modal__header">
          <div className="resume-modal__header-left">
            <FileText size={22} color="var(--color-primary)" />
            <div className="resume-modal__title-row">
              <span className="resume-modal__title">Rehman Shariff - Resume</span>
              <Badge variant="primary" size="sm">PDF Document</Badge>
            </div>
          </div>

          <div className="resume-modal__actions">
            <Button
              as="a"
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              iconLeft={ExternalLink}
              title="Open in New Tab"
            >
              Open Tab
            </Button>

            <Button
              as="a"
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              variant="primary"
              size="sm"
              iconLeft={Download}
              title="Download PDF Resume"
            >
              Download PDF
            </Button>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '6px'
              }}
              aria-label="Close modal"
            >
              <X size={22} />
            </button>
          </div>
        </header>

        {/* Modal Body: High performance PDF viewer */}
        <div className="resume-modal__body">
          <object
            data={`${RESUME_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
            type="application/pdf"
            className="resume-modal__iframe"
          >
            <iframe
              src={`${RESUME_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
              title="Rehman Shariff Resume PDF"
              className="resume-modal__iframe"
            >
              <div className="resume-modal__mobile-fallback">
                <p style={{ marginBottom: '16px' }}>Your browser does not support inline PDF viewing.</p>
                <Button
                  as="a"
                  href={RESUME_PATH}
                  download={RESUME_FILENAME}
                  variant="primary"
                  iconLeft={Download}
                >
                  Download {RESUME_FILENAME}
                </Button>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
