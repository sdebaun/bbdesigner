export * from './SkillGroupTags'

export const Panel: React.FC<{height?: string}> = ({children, height}) =>
  <div style={{ background: '#E3E3E3', padding: '0px', height}}>{children}</div>

