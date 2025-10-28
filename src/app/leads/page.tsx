"use client";

import { useState, useEffect, useMemo } from "react";
import { Lead } from "@/types";
import LeadList from "../components/leads/LeadList";
import LeadForm from "../components/leads/LeadForm";
import LeadSearch from "../components/leads/LeadSearch";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Plus } from "lucide-react";
import LinkedProductsModal from "../components/leads/LinkedProductsModal"; // 1. Import

export default function LeadsPage() {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for Add/Edit modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // 2. Add state for the new modal
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch leads");
        const data: Lead[] = await res.json();
        setAllLeads(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return allLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allLeads, searchTerm]);

  // --- CRUD Handlers ---

  const handleAddLead = (lead: Omit<Lead, "id">) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now(),
    };
    setAllLeads([newLead, ...allLeads]);
    setIsFormOpen(false);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setAllLeads(
      allLeads.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
    setIsFormOpen(false);
    setEditingLead(null);
  };

  const handleDeleteLead = (id: number) => {
    setAllLeads(allLeads.filter((lead) => lead.id !== id));
  };

  // --- Modal Handlers ---

  const handleEditClick = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const openForm = () => {
    setEditingLead(null);
    setIsFormOpen(true);
  };

  // 3. Add function to open the link modal
  const handleOpenLinkModal = (leadId: number) => {
    setSelectedLeadId(leadId);
    setIsLinkModalOpen(true);
  };

  // --- Render Logic ---

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-white">Leads</h1>
        <button
          onClick={openForm}
          className="flex items-center bg-blue-600 text-white p-2 md:px-4 rounded-full shadow hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="md:mr-2" />
          <span className="hidden md:block">Add New Lead</span>
        </button>
      </div>

      <LeadSearch onSearch={setSearchTerm} />

      {/* Add/Edit Form Modal */}
      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={editingLead ? handleUpdateLead : handleAddLead}
        initialData={editingLead}
      />

      {/* 4. Update LeadList to pass the new handler */}
      <LeadList
        leads={filteredLeads}
        onEdit={handleEditClick}
        onDelete={handleDeleteLead}
        onViewLinks={handleOpenLinkModal}
      />
      
      {/* 5. Add the new modal component */}
      <LinkedProductsModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        leadId={selectedLeadId}
      />
    </div>
  );
}