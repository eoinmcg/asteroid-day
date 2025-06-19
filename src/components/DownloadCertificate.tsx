import { useState } from 'react';
import { Modal  } from './Modal';
import { GenerateCertificate  } from './GenerateCertificate';
import { ChevronRight as Send } from 'lucide-react';

export function DownloadCertificate() {

  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [username, setUsername] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormSubmitted(true);
      return false;
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="text-2xl font-orbitron bg-white/20 p-4 rounded-lg my-4 border-2 border-black/40 text-shadow-lg
        transition hover:scale-110 hover:bg-white/30 hover:cursor-pointer">
        Get your certificate
      </button>
      <Modal title="Download Certificate" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {!formSubmitted && (
          <div className="">
            <form onSubmit={handleFormSubmit}>
              <div className="p-2 rounded-full border-1 border-black/20 shadow-md flex">
                <input className="p-2 pl-6 flex-grow rounded-lg bg-white text-gray-900 focus:outline-none" 
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
                <button className="p-2 rounded-full bg-orange-500 text-white transition hover:scale-110 hover:cursor-pointer"><Send /></button>
              </div>
            </form>
          </div>
        )}
        {formSubmitted && (
          <>
          <GenerateCertificate username={username} />
          </>

        )}
      </Modal>
    </>

  );

}
