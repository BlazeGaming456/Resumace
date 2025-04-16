import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register Roboto font
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-italic-webfont.ttf',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#000',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contact: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 4,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
  },
  educationItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationLeft: {
    flex: 3,
  },
  educationRight: {
    flex: 1,
    textAlign: 'right',
  },
  university: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  degree: {
    marginBottom: 2,
  },
  location: {
    fontStyle: 'italic',
    marginBottom: 2,
  },
  date: {
    marginBottom: 2,
  },
  projectItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectLeft: {
    flex: 3,
  },
  projectRight: {
    flex: 1,
    textAlign: 'right',
  },
  projectTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectTech: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  workItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workLeft: {
    flex: 3,
  },
  workRight: {
    flex: 1,
    textAlign: 'right',
  },
  workTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  workCompany: {
    marginBottom: 2,
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 2,
    flexDirection: 'row',
  },
  bulletSymbol: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  achievementsList: {
    marginLeft: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillsSection: {
    marginBottom: 10,
  },
  skillCategory: {
    fontWeight: 'bold',
    marginRight: 4,
  },
});

const ResumePDF = ({ resumeData = {} }) => {
  const {
    personalDetails = {},
    education = [],
    projects = [],
    work = [],
    achievements = [],
    technicalSkills = {}
  } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalDetails.name || ''}</Text>
          <View style={styles.contact}>
            {[
              personalDetails.phone,
              personalDetails.email,
              personalDetails.linkedin,
              personalDetails.github
            ]
            .filter(Boolean)
            .map((detail, index, arr) => (
              <Text key={index} style={styles.contactItem}>
                {detail}
                {index < arr.length - 1 ? ' | ' : ''}
              </Text>
            ))}
          </View>
        </View>

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationLeft}>
                  {edu.university && <Text style={styles.university}>{edu.university}</Text>}
                  {edu.degree && <Text style={styles.degree}>{edu.degree}</Text>}
                  {edu.location && <Text style={styles.location}>{edu.location}</Text>}
                </View>
                <View style={styles.educationRight}>
                  {edu.startDate && edu.endDate && (
                    <Text style={styles.date}>{edu.startDate} – {edu.endDate}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Work Experience */}
        {work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {work.map((job, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workLeft}>
                  {job.title && <Text style={styles.workTitle}>{job.title}</Text>}
                  {job.company && <Text style={styles.workCompany}>{job.company}</Text>}
                  {job.points?.map((point, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletText}>{point}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.workRight}>
                  {job.location && <Text style={styles.location}>{job.location}</Text>}
                  {job.startDate && job.endDate && (
                    <Text style={styles.date}>{job.startDate} – {job.endDate}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <View style={styles.projectLeft}>
                  {project.name && <Text style={styles.projectTitle}>{project.name}</Text>}
                  {project.technologies && <Text style={styles.projectTech}>{project.technologies}</Text>}
                  {project.points?.map((point, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletText}>{point}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.projectRight}>
                  {project.startDate && project.endDate && (
                    <Text style={styles.date}>{project.startDate} – {project.endDate}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
            <View style={styles.achievementsList}>
              {achievements.map((ach, index) => (
                <View key={index} style={styles.achievementItem}>
                  <Text style={styles.bulletSymbol}>•</Text>
                  <Text style={styles.bulletText}>{ach}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Technical Skills */}
        {(technicalSkills.languages || technicalSkills.frameworks || 
          technicalSkills.tools || technicalSkills.libraries) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
            {technicalSkills.languages && (
              <View style={styles.skillsSection}>
                <Text>
                  <Text style={styles.skillCategory}>Languages:</Text> {technicalSkills.languages}
                </Text>
              </View>
            )}
            {technicalSkills.frameworks && (
              <View style={styles.skillsSection}>
                <Text>
                  <Text style={styles.skillCategory}>Frameworks:</Text> {technicalSkills.frameworks}
                </Text>
              </View>
            )}
            {technicalSkills.tools && (
              <View style={styles.skillsSection}>
                <Text>
                  <Text style={styles.skillCategory}>Developer Tools:</Text> {technicalSkills.tools}
                </Text>
              </View>
            )}
            {technicalSkills.libraries && (
              <View style={styles.skillsSection}>
                <Text>
                  <Text style={styles.skillCategory}>Libraries:</Text> {technicalSkills.libraries}
                </Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;