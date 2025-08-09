'use client'

import { motion } from 'framer-motion'
import { FaBuilding, FaSearch, FaChartLine, FaPhone, FaEnvelope, FaCheckCircle, FaRocket, FaShieldAlt, FaHandshake } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('process')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    jobType: '', 
    desiredAmount: '', 
    businessNumber: '',
    privacyAgree: false
  })
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [applications, setApplications] = useState([
    { name: '김**', time: '방금 전', location: '서울' },
    { name: '이**', time: '1분 전', location: '부산' },
    { name: '박**', time: '2분 전', location: '대구' },
    { name: '최**', time: '3분 전', location: '인천' },
    { name: '정**', time: '5분 전', location: '광주' },
    { name: '강**', time: '7분 전', location: '대전' },
    { name: '조**', time: '10분 전', location: '울산' },
    { name: '윤**', time: '12분 전', location: '세종' },
  ])

  const tabContent = {
    process: {
      title: '신청절차',
      steps: [
        { num: '01', title: '무료 상담 신청', desc: '간단한 정보 입력으로 시작', icon: '📝' },
        { num: '02', title: '전문가 매칭', desc: '업종별 전문 컨설턴트 배정', icon: '🤝' },
        { num: '03', title: '맞춤 진단', desc: '받을 수 있는 정책자금 분석', icon: '🔍' },
        { num: '04', title: '서류 준비', desc: '필요 서류 안내 및 작성 지원', icon: '📋' },
        { num: '05', title: '신청 진행', desc: '정책자금 신청 대행', icon: '🚀' },
        { num: '06', title: '승인 완료', desc: '자금 수령 및 사후 관리', icon: '✅' }
      ]
    },
    direction: {
      title: '지원방향',
      items: [
        { icon: '🎯', title: '창업 초기 기업', desc: '창업 3년 이내 스타트업 집중 지원' },
        { icon: '🏭', title: '제조업 육성', desc: '설비투자 및 기술개발 자금 우대' },
        { icon: '🛍️', title: '소상공인 회복', desc: '코로나19 피해 소상공인 특별 지원' },
        { icon: '🌱', title: '친환경 전환', desc: 'ESG 경영 및 탄소중립 지원 확대' }
      ]
    },
    target: {
      title: '지원대상',
      categories: [
        { title: '중소기업', items: ['제조업 (300인 미만)', '서비스업 (100인 미만)', '건설업 (200인 미만)'], color: 'from-blue-500 to-purple-500' },
        { title: '소상공인', items: ['상시근로자 10인 미만', '연 매출 10억원 이하', '개인사업자 및 법인'], color: 'from-green-500 to-teal-500' },
        { title: '특별지원', items: ['청년창업 (만 39세 이하)', '여성기업', '장애인기업'], color: 'from-pink-500 to-rose-500' }
      ]
    },
    benefit: {
      title: '지원혜택',
      benefits: [
        { icon: '💰', title: '최대 30억원', desc: '기업 규모별 차등 지원' },
        { icon: '📉', title: '초저금리', desc: '연 1.5% ~ 2.5% 특별금리' },
        { icon: '⏰', title: '장기 상환', desc: '최대 30년 분할상환 가능' },
        { icon: '🎁', title: '추가 혜택', desc: '컨설팅, 교육, 멘토링 무료 제공' }
      ]
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setApplications(prev => {
        const newApps = [...prev]
        newApps.push(newApps.shift()!)
        return newApps
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById('consultation-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.privacyAgree) {
      alert('개인정보처리방침에 동의해주세요.')
      return
    }
    
    setIsSubmitting(true)
    
    // 현재 폼 데이터 저장
    const currentFormData = { ...formData }
    
    // 즉시 성공 메시지 표시
    alert('신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.')
    
    // 폼 초기화
    setFormData({ 
      name: '', 
      phone: '', 
      jobType: '', 
      desiredAmount: '', 
      businessNumber: '',
      privacyAgree: false
    })
    
    setIsSubmitting(false)
    
    // 백그라운드에서 API 호출
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentFormData),
    }).catch(error => {
      console.error('Background submission error:', error)
    })
  }

  return (
    <main className="overflow-x-hidden relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-500 to-primary min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8"
            >
              <span className="text-sm md:text-base font-medium">2025년 정책 예산 8조 7천억원</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative inline-block"
              >
                중소기업
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400"
                />
              </motion.span>
              <span className="text-white/80 mx-2">/</span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="relative inline-block"
              >
                소상공인
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-400 to-red-400"
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="block mt-6"
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-secondary to-pink-500 blur-lg opacity-70"></span>
                  <span className="relative bg-gradient-to-r from-secondary to-pink-500 px-8 py-4 rounded-2xl inline-block text-white shadow-2xl">
                    정책자금
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                    className="absolute -top-2 -right-2 text-2xl"
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.span>
            </h1>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="inline-block bg-accent text-gray-800 px-8 py-4 rounded-full font-bold text-lg md:text-xl mb-8 shadow-2xl"
            >
              최대금리-최대30년
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-white text-primary px-8 py-6 rounded-2xl inline-block shadow-2xl"
            >
              <p className="text-lg md:text-xl font-semibold">1:1 전문 무료 컨설팅 받으세요</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-center mt-12"
          >
            <div className="text-white text-4xl">↓</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative inline-block"
              >
                대표님 사업장에 맞춘
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 -z-10 rounded-full"
                />
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative inline-block"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  받을수 있는 정책자금 추천
                </span>
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -right-12 -top-8 text-2xl"
                >
                  💡
                </motion.span>
              </motion.span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: FaBuilding, title: "기업규모에 따른", desc: "맞춤형 추천", gradient: "from-blue-400 to-cyan-400" },
              { icon: FaSearch, title: "사업특성에 맞는", desc: "최적의 정책자금", gradient: "from-purple-400 to-pink-400" },
              { icon: FaChartLine, title: "서류/대출 모두", desc: "원스톱으로 1:1 맞춤 컨설팅", gradient: "from-orange-400 to-red-400" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, type: "spring" }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                    <feature.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 font-medium">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "월 평균 진단 수", value: "7,834", gradient: "from-blue-500 to-purple-500", icon: "📊" },
              { label: "월 평균 승인액", value: "134억", gradient: "from-red-500 to-pink-500", icon: "💵" },
              { label: "평균 승인 비율", value: "81%", gradient: "from-yellow-500 to-orange-500", icon: "🎯" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden bg-white p-8 rounded-3xl shadow-xl text-center group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: idx * 0.3 }}
                  className="text-4xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <p className="text-gray-600 font-medium mb-3">{stat.label}</p>
                <p className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
          >
            정책자금 조달<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">성공사례</span>
          </motion.h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400"></div>
              {[
                {
                  title: "소상공인 전용 혁신 성장 자금",
                  desc: "컨설팅 완료",
                  amount: "2,000만원",
                  company: "OO 카페 대표",
                  position: "left",
                  color: "from-purple-500 to-pink-500",
                  icon: "☕"
                },
                {
                  title: "스타트업 초기 자금 지원",
                  desc: "상담부터 승인까지 단 5일",
                  amount: "5,000만원",
                  company: "OO 스타트업 대표",
                  position: "right",
                  color: "from-blue-500 to-purple-500",
                  icon: "🚀"
                },
                {
                  title: "무인 자판기 관련 보조금 승인",
                  desc: "월 매출 50% 상승",
                  amount: "3,000만원",
                  company: "OO무인매장 대표",
                  position: "left",
                  color: "from-pink-500 to-orange-500",
                  icon: "🏪"
                },
                {
                  title: "제조업체 시설자금 대출 승인",
                  desc: "저금리 대출 전환 성공",
                  amount: "1억 5천만원",
                  company: "OO제조 대표",
                  position: "right",
                  color: "from-green-500 to-blue-500",
                  icon: "🏭"
                }
              ].map((story, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, type: "spring" }}
                  className={`mb-12 flex ${story.position === 'right' ? 'justify-end' : ''} relative`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`bg-white p-8 rounded-3xl shadow-xl max-w-md ${story.position === 'left' ? 'mr-8' : 'ml-8'} relative`}
                  >
                    <div className={`absolute -top-6 ${story.position === 'left' ? '-right-6' : '-left-6'} w-12 h-12 bg-gradient-to-br ${story.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                      <span className="text-2xl">{story.icon}</span>
                    </div>
                    <div className={`absolute top-1/2 ${story.position === 'left' ? 'right-full mr-8' : 'left-full ml-8'} transform -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-gradient-to-br ${story.color}`}></div>
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${story.color} bg-clip-text text-transparent mb-3`}>{story.title}</h3>
                    <p className="text-gray-600 mb-2">{story.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-800">{story.amount}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{story.company}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
          >
            세상편리한<br />
            <span className="text-primary">온라인 통합 절차</span>
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['process', 'direction', 'target', 'benefit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'process' && '신청절차'}
                {tab === 'direction' && '지원방향'}
                {tab === 'target' && '지원대상'}
                {tab === 'benefit' && '지원혜택'}
              </button>
            ))}
          </div>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            {activeTab === 'process' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tabContent.process.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      STEP {step.num}
                    </div>
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'direction' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {tabContent.direction.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                    <p className="text-gray-700">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'target' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tabContent.target.categories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative overflow-hidden bg-white rounded-3xl shadow-xl"
                  >
                    <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                    <div className="p-6">
                      <h4 className="text-2xl font-bold mb-4">{category.title}</h4>
                      <ul className="space-y-3">
                        {category.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 + i * 0.1 }}
                            className="flex items-center"
                          >
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3`}></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'benefit' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tabContent.benefit.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, rotate: -5 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: idx * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                      className="text-5xl mb-4"
                    >
                      {benefit.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                avatar: "😊",
                name: "카페창업 3년차 대표",
                detail: "매출하락고민",
                content: "체계적인 대화를 경청하고 상담 후 신속하게 진행되어 매우 만족합니다."
              },
              {
                avatar: "😄",
                name: "제조업 1년차 대표님",
                detail: "기계설비 부족문제",
                content: "대표님도 자료만 준비하시면 나머지는 알아서 처리해주셔서 정말 편했습니다."
              },
              {
                avatar: "😎",
                name: "대리먼치 창업전문점",
                detail: "유행식자 대체회전",
                content: "전문가님들과 함께해서 성공적으로 받을 수 있었습니다. 감사합니다!"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.detail}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation-form" className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block"
            >
              무조건 정책자금 자금조달
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-accent"
            >
              성공하게 해드립니다!
            </motion.span>
          </motion.h2>
          
          
          <p className="text-xl mb-8">정책자금 무료상담 문의하기 ⬇️</p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="1. 성함"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg"
              required
            />
            <input
              type="tel"
              placeholder="2. 연락처"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg"
              required
            />
            <select
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg"
              required
            >
              <option value="">3. 직군 선택</option>
              <option value="근로자">근로자</option>
              <option value="개인사업자">개인사업자</option>
              <option value="법인사업자">법인사업자</option>
              <option value="프리랜서">프리랜서</option>
              <option value="주부">주부</option>
            </select>
            <select
              value={formData.desiredAmount}
              onChange={(e) => setFormData({ ...formData, desiredAmount: e.target.value })}
              className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg"
              required
            >
              <option value="">4. 희망금액 선택</option>
              <option value="1천만원 미만">1천만원 미만</option>
              <option value="1천만원~3천만원">1천만원~3천만원</option>
              <option value="3천만원~5천만원">3천만원~5천만원</option>
              <option value="5천만원 이상">5천만원 이상</option>
            </select>
            {(formData.jobType === '개인사업자' || formData.jobType === '법인사업자') && (
              <input
                type="text"
                placeholder="사업자등록번호"
                value={formData.businessNumber}
                onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg"
                required
              />
            )}
            <div className="mb-4 text-left">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.privacyAgree}
                  onChange={(e) => setFormData({ ...formData, privacyAgree: e.target.checked })}
                  className="mr-2 w-4 h-4"
                  required
                />
                <span className="text-sm">
                  <Link href="/privacy" target="_blank" className="underline hover:text-accent">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </span>
              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-accent'} text-gray-800 px-6 py-4 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transition-all`}
            >
              {isSubmitting ? '처리 중...' : '등록하기'}
            </motion.button>
          </form>
          
          {/* Real-time Applications */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            className="mt-12 relative max-w-sm mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold flex items-center">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-2 shadow-lg"
                  ></motion.span>
                  실시간 신청 현황
                </h3>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="text-white/60"
                >
                  ⚡
                </motion.div>
              </div>
              <div className="space-y-3">
                {applications.slice(0, 3).map((app, idx) => (
                  <motion.div
                    key={`${app.name}-${idx}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2, type: "spring" }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-white/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                            {app.name[0]}
                          </div>
                          <span className="text-white font-medium text-sm">{app.name}님이 신청</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white/70 text-xs">{app.location}</div>
                          <div className="text-white/50 text-xs">{app.time}</div>
                        </div>
                      </div>
                      {idx === 0 && (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute -right-2 -top-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg"
                        >
                          NEW
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 text-center text-white/60 text-xs"
              >
                지금 이 순간에도 신청이 계속되고 있습니다
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fixed Scroll Button - Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: showScrollButton ? 1 : 0, 
          y: showScrollButton ? 0 : 100
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
        style={{ 
          pointerEvents: showScrollButton ? 'auto' : 'none'
        }}
      >
        <motion.button
          onClick={scrollToForm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-2xl mx-auto bg-gradient-to-r from-accent to-yellow-400 text-gray-900 font-bold text-lg py-4 px-8 rounded-full shadow-2xl flex items-center justify-center gap-3 hover:shadow-3xl transition-all"
          style={{ 
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-2xl"
          >
            📝
          </motion.span>
          <span>지금 바로 무료 상담 신청하기</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl"
          >
            →
          </motion.span>
        </motion.button>
        
        {/* Glow Effect */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 px-4 pb-4"
          style={{ pointerEvents: 'none' }}
        >
          <div className="w-full max-w-2xl mx-auto h-full bg-gradient-to-r from-accent/30 to-yellow-400/30 rounded-full blur-xl" />
        </motion.div>
      </motion.div>
    </main>
  )
}