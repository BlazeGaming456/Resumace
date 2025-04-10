import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/18749/Helvetica.woff' },
    { src: 'https://fonts.cdnfonts.com/s/18749/Helvetica-Bold.woff', fontWeight: 'bold' },
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#000',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 5,
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 10,
    color: '#222',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    borderBottom: '1px solid #000',
    paddingBottom: 2,
  },
  educationItem: {
    marginBottom: 10,
  },
  schoolName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  degreeInfo: {
    marginBottom: 2,
  },
  location: {
    fontStyle: 'italic',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  projectName: {
    fontWeight: 'bold',
  },
  projectTech: {
    fontStyle: 'italic',
  },
  projectDuration: {
    color: '#555',
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 3,
  },
  skillsSection: {
    marginBottom: 10,
  },
  skillCategory: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  skillsList: {
    marginLeft: 2,
  },
});

const ResumePDF = ({ resumeData = {} }) => {
  const {
    personalDetails = {},
    education = [],
    projects = [],
    achievements = [],
    technicalSkills = {}
  } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Fixed Version */}
<View style={{ 
  marginBottom: 5,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center' 
}}>
  <Text style={styles.name}>{personalDetails.name || 'Ajin Chundakkattu Raju'}</Text>
  <View style={{ 
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  }}>
    <Text style={styles.contactInfo}>{personalDetails.phone || '8590394820'}</Text>
    <Text style={styles.contactInfo}>|</Text>
    <Text style={styles.contactInfo}>{personalDetails.email || 'ajincraju@gmail.com'}</Text>
    <Text style={styles.contactInfo}>|</Text>
    <Text style={styles.contactInfo}>{personalDetails.linkedin || 'linkedin.com/in/ajin-chundakkattu-raju'}</Text>
    <Text style={styles.contactInfo}>|</Text>
    <Text style={styles.contactInfo}>{personalDetails.github || 'github.com/BlazeGaming456'}</Text>
  </View>
</View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.schoolName}>{edu.university || 'Indian Institute of Information Technology, Jabalpur'}</Text>
                <Text style={styles.location}>{edu.location || 'Jabalpur, Madhya Pradesh'}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.degreeInfo}>
                    {edu.degree || 'Bachelor of Technology in Electronics & Communication Eng.'} - {edu.grade && `CPI - ${edu.grade}`} {edu.spi && `(SPI - ${edu.spi})`}
                </Text>
                <Text>
                    {edu.startDate || 'Aug. 2023'} – {edu.endDate || 'May 2027'}
                </Text>
                </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
                    <Text style={{fontWeight:"bold",}}>{project.name || 'Taskify'}</Text>
                    <Text style={styles.projectName}>|</Text>
                    <Text style={styles.projectTech}>{project.technologies || 'React, Node.js, Express.js, TailWind CSS, MongoDB'}</Text>
                </View>

                <Text style={styles.projectDuration}>
                  {project.startDate || 'December 2024'} – {project.endDate || 'January 2025'}
                </Text>
              </View>
              {project.points && project.points.map((point, i) => (
                <Text key={i} style={styles.bulletPoint}>• {point || 'Developed a full-stack task manager application.'}</Text>
              ))}
            </View>
          ))}
        </View>

        {/* Achievements */}
        {achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {achievements.map((achievement, index) => (
              <Text key={index} style={styles.bulletPoint}>• {achievement || 'In the Organizing Committee of several events.'}</Text>
            ))}
          </View>
        )}

        {/* Technical Skills */}
        {technicalSkills && Object.keys(technicalSkills).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {Object.entries(technicalSkills).map(([category, skills], index) => (
              <View key={index} style={{flexDirection: 'row'}}>
                <Text style={styles.skillCategory}>{category || 'Languages'}:</Text>
                <Text style={styles.skillsList}>{skills || 'C++, Python, HTML, CSS, JavaScript, PostgreSQL, MongoDB'}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;