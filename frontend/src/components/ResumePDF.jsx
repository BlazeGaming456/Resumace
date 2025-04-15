import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register Roboto font
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf',
      fontWeight: 'normal'
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf',
      fontWeight: 'bold'
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic'
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#000',
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 12,
    marginLeft: 20, // Added tab space for sections
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
    marginLeft: 20, // Added tab space for education items
  },
  projectItem: {
    marginBottom: 10,
    marginLeft: 20, // Added tab space for projects
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
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
            {personalDetails.name || 'Your Name'}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
            {[personalDetails.phone, personalDetails.email, personalDetails.linkedin, personalDetails.github]
              .filter(Boolean)
              .map((detail, index, arr) => (
                <Text key={index} style={{ fontSize: 10, marginRight: 5 }}>
                  {detail}{index < arr.length - 1 ? ' | ' : ''}
                </Text>
              ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={{ fontWeight: 'bold' }}>{edu.university}</Text>
              <Text>{edu.degree}</Text>
              <Text style={{ fontStyle: 'italic' }}>{edu.location}</Text>
              <Text>{edu.startDate} - {edu.endDate}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text style={{ fontWeight: 'bold' }}>{project.name}</Text>
              <Text style={{ fontStyle: 'italic' }}>{project.technologies}</Text>
              {project.points && project.points.map((point, i) => (
                <Text key={i} style={{ marginLeft: 10 }}>• {point}</Text>
              ))}
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
};

export default ResumePDF;