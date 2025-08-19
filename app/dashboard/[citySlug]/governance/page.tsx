'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, FileText, Vote, Users, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'

interface GovernancePageProps {
  params: {
    citySlug: string
  }
}

interface GovernanceDoc {
  id: string
  title: string
  description: string
  type: 'constitution' | 'bylaws' | 'policy' | 'guideline'
  version: string
  last_updated: string
  requires_vote: boolean
}

interface Vote {
  id: string
  title: string
  description: string
  status: 'active' | 'closed' | 'upcoming'
  end_date: string
  total_votes: number
  user_vote?: 'yes' | 'no' | 'abstain'
}

export default function GovernancePage({ params }: GovernancePageProps) {
  const [governanceDocs, setGovernanceDocs] = useState<GovernanceDoc[]>([])
  const [activeVotes, setActiveVotes] = useState<Vote[]>([])
  const [loading, setLoading] = useState(true)
  const [cityName, setCityName] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<GovernanceDoc | null>(null)

  useEffect(() => {
    loadGovernanceData()
  }, [params.citySlug])

  const loadGovernanceData = async () => {
    try {
      // Get city data first
      const { data: city } = await supabase
        .from('cities')
        .select('name')
        .eq('slug', params.citySlug)
        .single()

      if (city) setCityName(city.name)

      // Mock data for governance documents
      const mockDocs: GovernanceDoc[] = [
        {
          id: '1',
          title: 'BEAM BAND Constitution',
          description: 'The foundational document establishing our community principles, structure, and governance framework.',
          type: 'constitution',
          version: '1.0',
          last_updated: '2024-01-15',
          requires_vote: false
        },
        {
          id: '2',
          title: 'Community Bylaws',
          description: 'Detailed rules and procedures for community operations, member rights, and organizational structure.',
          type: 'bylaws',
          version: '2.1',
          last_updated: '2024-02-20',
          requires_vote: true
        },
        {
          id: '3',
          title: 'Event Funding Policy',
          description: 'Guidelines for allocating funds to community events, including application process and criteria.',
          type: 'policy',
          version: '1.2',
          last_updated: '2024-03-10',
          requires_vote: true
        },
        {
          id: '4',
          title: 'Community Guidelines',
          description: 'Standards of conduct, conflict resolution, and community engagement expectations.',
          type: 'guideline',
          version: '1.0',
          last_updated: '2024-01-20',
          requires_vote: false
        }
      ]

      // Mock data for active votes
      const mockVotes: Vote[] = [
        {
          id: '1',
          title: 'Amend Event Funding Policy',
          description: 'Proposal to increase the maximum funding amount for community events from $5,000 to $7,500.',
          status: 'active',
          end_date: '2024-04-15',
          total_votes: 45,
          user_vote: undefined
        },
        {
          id: '2',
          title: 'New Community Space Initiative',
          description: 'Proposal to allocate $15,000 for establishing a permanent community rehearsal and meeting space.',
          status: 'upcoming',
          end_date: '2024-05-01',
          total_votes: 0,
          user_vote: undefined
        }
      ]

      setGovernanceDocs(mockDocs)
      setActiveVotes(mockVotes)
      setLoading(false)
    } catch (error) {
      console.error('Error loading governance data:', error)
      setLoading(false)
    }
  }

  const getDocTypeColor = (type: string) => {
    switch (type) {
      case 'constitution':
        return 'bg-purple-100 text-purple-800'
      case 'bylaws':
        return 'bg-blue-100 text-blue-800'
      case 'policy':
        return 'bg-green-100 text-green-800'
      case 'guideline':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getVoteStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const handleVote = async (voteId: string, vote: 'yes' | 'no' | 'abstain') => {
    // Update local state immediately for better UX
    setActiveVotes(prev => prev.map(v => 
      v.id === voteId ? { ...v, user_vote: vote, total_votes: v.total_votes + 1 } : v
    ))

    try {
      // Here you would typically save the vote to Supabase
      // const { error } = await supabase
      //   .from('votes')
      //   .upsert({ vote_id: voteId, user_vote: vote, user_id: user.id })
      
      console.log(`Vote recorded: ${vote} for vote ${voteId}`)
    } catch (error) {
      console.error('Error recording vote:', error)
      // Revert the optimistic update on error
      setActiveVotes(prev => prev.map(v => 
        v.id === voteId ? { ...v, user_vote: undefined, total_votes: v.total_votes - 1 } : v
      ))
    }
  }

  if (loading) {
    return (
      <DashboardLayout citySlug={params.citySlug} cityName={cityName || 'Loading...'}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout citySlug={params.citySlug} cityName={cityName}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Governance</h1>
          <p className="text-gray-600">Participate in community decision-making and review governance documents</p>
        </div>

        {/* Active Votes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <div className="flex items-center mb-6">
            <Vote className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Active Community Votes</h2>
          </div>

          {activeVotes.filter(vote => vote.status === 'active').length > 0 ? (
            <div className="space-y-4">
              {activeVotes.filter(vote => vote.status === 'active').map((vote) => (
                <div key={vote.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{vote.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{vote.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Ends: {formatDate(vote.end_date)}</span>
                        <span>{getDaysRemaining(vote.end_date)} days remaining</span>
                        <span>{vote.total_votes} votes cast</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVoteStatusColor(vote.status)}`}>
                      {vote.status.charAt(0).toUpperCase() + vote.status.slice(1)}
                    </span>
                  </div>

                  {/* Voting Buttons */}
                  {!vote.user_vote ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleVote(vote.id, 'yes')}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Vote Yes
                      </button>
                      <button
                        onClick={() => handleVote(vote.id, 'no')}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Vote No
                      </button>
                      <button
                        onClick={() => handleVote(vote.id, 'abstain')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
                      >
                        Abstain
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">
                        You voted: <span className="font-medium capitalize">{vote.user_vote}</span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Vote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active votes at the moment</p>
            </div>
          )}
        </motion.div>

        {/* Governance Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Governance Documents</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {governanceDocs.map((doc) => (
              <div
                key={doc.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => setSelectedDoc(doc)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocTypeColor(doc.type)}`}>
                    {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{doc.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Version {doc.version}</span>
                  <span>Updated {formatDate(doc.last_updated)}</span>
                </div>
                {doc.requires_vote && (
                  <div className="mt-2 flex items-center text-xs text-blue-600">
                    <Vote className="w-3 h-3 mr-1" />
                    Requires community vote
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Community Participation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Voice Matters</h2>
              <p className="text-blue-100">Participate in community decisions and help shape our future</p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{activeVotes.filter(v => v.status === 'active').length}</div>
              <div className="text-blue-100 text-sm">Active Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{governanceDocs.length}</div>
              <div className="text-blue-100 text-sm">Governance Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-blue-100 text-sm">Transparency</div>
            </div>
          </div>
        </motion.div>

        {/* Document Viewer Modal */}
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDoc.title}</h2>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <AlertCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDocTypeColor(selectedDoc.type)}`}>
                    {selectedDoc.type.charAt(0).toUpperCase() + selectedDoc.type.slice(1)}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">
                    Version {selectedDoc.version} • Updated {formatDate(selectedDoc.last_updated)}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-6">{selectedDoc.description}</p>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    This document is part of our community governance framework. 
                    {selectedDoc.requires_vote && ' Changes to this document require community approval through voting.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
