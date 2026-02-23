import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext()

// Mock data
const mockVeterinarianData = {
  user: {
    id: 'vet-001',
    name: 'Dr. Thomas',
    email: 'dr.thomas@vetclinic.com',
    phone: '+1234567890',
    specialty: 'Large Animal Veterinarian',
    clinic: 'Animal Health Center',
    address: '123 Veterinary Street, City, Country',
    role: 'veterinarian'
  },
  appointments: [
    { id: 1, farmerName: 'John Doe', email: 'john@farm.com', date: '2024-02-25', time: '10:00', animalName: 'Daisy', reason: 'Routine checkup', status: 'pending' },
    { id: 2, farmerName: 'Jane Smith', email: 'jane@farm.com', date: '2024-02-26', time: '14:00', animalName: 'Bessie', reason: 'Follow-up treatment', status: 'pending' }
  ],
  questions: [
    { id: 1, farmerName: 'John Doe', email: 'john@farm.com', question: 'How to treat cow mastitis?', date: '2024-02-20', status: 'pending', animalName: 'Daisy' },
    { id: 2, farmerName: 'Jane Smith', email: 'jane@farm.com', question: 'Best nutrition for goats?', date: '2024-02-21', status: 'pending', animalName: 'Nanny' }
  ],
  news: [],
  resources: [],
  notifications: { appointments: 3, questions: 5, general: 8 }
}

const mockFarmerData = {
  user: {
    id: 'farmer-001',
    name: 'John Farmer',
    email: 'john@farm.com',
    phone: '+1234567890',
    farmName: 'Green Valley Farm',
    location: 'Rural Area',
    role: 'farmer'
  },
  animals: [
    { id: 1, name: 'Daisy', type: 'cow', breed: 'Holstein', age: 4, gender: 'female', weight: 550, healthStatus: 'healthy', tag: 'Farm-001' },
    { id: 2, name: 'Bessie', type: 'cow', breed: 'Jersey', age: 3, gender: 'female', weight: 450, healthStatus: 'monitoring', tag: 'Farm-002' },
    { id: 3, name: 'Nanny', type: 'goat', breed: 'Saanen', age: 2, gender: 'female', weight: 65, healthStatus: 'treatment', tag: 'Farm-004' }
  ],
  appointments: [
    { id: 1, vetName: 'Dr. Thomas', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '10:00', animalName: 'Daisy', reason: 'Routine checkup', status: 'confirmed' },
    { id: 2, vetName: 'Dr. Smith', date: new Date(Date.now() + 172800000).toISOString().split('T')[0], time: '14:00', animalName: 'Bessie', reason: 'Follow-up treatment', status: 'pending' }
  ],
  questions: [
    { id: 1, subject: 'Cow not eating properly', category: 'health', animal: 'Daisy', date: '2024-02-20', status: 'answered', answer: 'Try adjusting feed mixture...' },
    { id: 2, subject: 'Milk production decreased', category: 'nutrition', animal: 'Bessie', date: '2024-02-21', status: 'pending' }
  ],
  marketPrices: [
    { commodity: 'Milk', price: '$0.45/L', change: '+2.3%', trend: 'up' },
    { commodity: 'Beef', price: '$4.20/kg', change: '-1.2%', trend: 'down' }
  ],
  notifications: { questions: 3, general: 8 }
}

export function AppProvider({ children }) {
  const [role, setRole] = useState(null)
  const [userData, setUserData] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [questions, setQuestions] = useState([])
  const [animals, setAnimals] = useState([])
  const [news, setNews] = useState([])
  const [resources, setResources] = useState([])
  const [notifications, setNotifications] = useState({})

  const setUserRole = useCallback((userRole) => {
    setRole(userRole)
    if (userRole === 'veterinarian') {
      setUserData(mockVeterinarianData.user)
      setAppointments(mockVeterinarianData.appointments)
      setQuestions(mockVeterinarianData.questions)
      setNews(mockVeterinarianData.news)
      setResources(mockVeterinarianData.resources)
      setNotifications(mockVeterinarianData.notifications)
    } else if (userRole === 'farmer') {
      setUserData(mockFarmerData.user)
      setAnimals(mockFarmerData.animals)
      setAppointments(mockFarmerData.appointments)
      setQuestions(mockFarmerData.questions)
      setNotifications(mockFarmerData.notifications)
    }
  }, [])

  const addAppointment = useCallback((appointment) => {
    setAppointments(prev => [...prev, { ...appointment, id: Date.now() }])
  }, [])

  const addQuestion = useCallback((question) => {
    setQuestions(prev => [...prev, { ...question, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'pending' }])
  }, [])

  const addAnimal = useCallback((animal) => {
    setAnimals(prev => [...prev, { ...animal, id: Date.now() }])
  }, [])

  const addNews = useCallback((newsItem) => {
    setNews(prev => [...prev, { ...newsItem, id: Date.now() }])
  }, [])

  const addResource = useCallback((resource) => {
    setResources(prev => [...prev, { ...resource, id: Date.now() }])
  }, [])

  const updateAppointment = useCallback((id, updates) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt))
  }, [])

  const updateQuestion = useCallback((id, updates) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q))
  }, [])

  const updateAnimal = useCallback((id, updates) => {
    setAnimals(prev => prev.map(animal => animal.id === id ? { ...animal, ...updates } : animal))
  }, [])

  const deleteAppointment = useCallback((id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id))
  }, [])

  const deleteQuestion = useCallback((id) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }, [])

  const deleteAnimal = useCallback((id) => {
    setAnimals(prev => prev.filter(animal => animal.id !== id))
  }, [])

  const deleteNews = useCallback((id) => {
    setNews(prev => prev.filter(item => item.id !== id))
  }, [])

  const deleteResource = useCallback((id) => {
    setResources(prev => prev.filter(item => item.id !== id))
  }, [])

  const value = {
    role,
    setUserRole,
    userData,
    setUserData,
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    animals,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    news,
    addNews,
    deleteNews,
    resources,
    addResource,
    deleteResource,
    notifications,
    setNotifications
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
