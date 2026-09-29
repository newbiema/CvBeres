import { UserRound } from 'lucide-react'
import { useCV } from '../../context/cv-context'
import { EditorSection } from './EditorSection'
import { InputField } from './Fields'

export function PersonalSection() {
  const { cv, updatePersonal } = useCV()
  const personal = cv.personal

  return (
    <EditorSection
      title="Informasi pribadi"
      description="Informasi utama yang tampil di bagian atas CV."
      icon={UserRound}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          id="full-name"
          label="Nama lengkap"
          value={personal.fullName}
          onChange={(fullName) => updatePersonal({ fullName })}
          autoComplete="name"
          placeholder="Nama lengkap"
          required
        />
        <InputField
          id="professional-title"
          label="Posisi profesional"
          value={personal.professionalTitle}
          onChange={(professionalTitle) => updatePersonal({ professionalTitle })}
          placeholder="Contoh: Staf Administrasi"
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={personal.email}
          onChange={(email) => updatePersonal({ email })}
          autoComplete="email"
          placeholder="nama@email.com"
          required
        />
        <InputField
          id="phone"
          label="Nomor telepon"
          type="tel"
          value={personal.phone}
          onChange={(phone) => updatePersonal({ phone })}
          autoComplete="tel"
          placeholder="08xxxxxxxxxx"
        />
        <InputField
          id="location"
          label="Lokasi"
          value={personal.location}
          onChange={(location) => updatePersonal({ location })}
          placeholder="Kota, Provinsi"
        />
        <InputField
          id="linkedin"
          label="LinkedIn"
          value={personal.linkedin}
          onChange={(linkedin) => updatePersonal({ linkedin })}
          placeholder="linkedin.com/in/username"
        />
        <InputField
          id="github"
          label="Profil atau portofolio"
          value={personal.github}
          onChange={(github) => updatePersonal({ github })}
          placeholder="contoh.com/profil"
        />
        <InputField
          id="website"
          label="Website atau portofolio"
          value={personal.website}
          onChange={(website) => updatePersonal({ website })}
          placeholder="portfolio.com"
        />
      </div>
    </EditorSection>
  )
}
