import React from 'react';
import { useForm } from 'react-hook-form';
import ResumePDF from '../components/ResumePDF.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successmessage, setSuccessMessage] = React.useState('');
  const [resumeData, setResumeData] = React.useState({
    personalDetails: {
      name: "Ajin Chundakkattu Raju",
      email: "ajincraju@gmail.com",
      phone: "+91 85903 94820",
      linkedin: "linkedin.com/in/ajin-chundakkattu-raju",
      github: "github.com/BlazeGaming456"
    },
    education: [
      {
        university: "Indian Institute of Information Technology, Jabalpur",
        degree: "Bachelor of Technology",
        field: "Electronics & Communication Engineering",
        grade: "8.5",
        spi: "9.2 (Last Semester)",
        location: "Jabalpur, Madhya Pradesh",
        startDate: "Aug 2023",
        endDate: "May 2027 (Expected)"
      }
    ],
    projects: [
      {
        name: "Taskify",
        technologies: "React, Node.js, Express, MongoDB, Tailwind CSS",
        startDate: "Dec 2024",
        endDate: "Jan 2025",
        points: [
          "Developed a full-stack task manager with user authentication",
          "Implemented drag-and-drop task organization using React DnD",
          "Created RESTful API with Node.js handling 50+ requests/sec",
          "Designed responsive UI with Tailwind CSS supporting mobile devices"
        ]
      },
      {
        name: "AI Resume Builder",
        technologies: "React, PDFKit, OpenAI API",
        startDate: "Feb 2025",
        endDate: "Mar 2025",
        points: [
          "Built an AI-powered resume generator with dynamic templates",
          "Integrated OpenAI for content suggestions and improvements",
          "Implemented PDF generation with custom layouts and styling",
          "Reduced resume creation time by 70% for test users"
        ]
      }
    ],
    achievements: [
      "Secured 1st position in HackJNU 2024 coding competition",
      "Published research paper on 'AI in Education' in IEEE Xplore",
      "Selected for Google Summer of Code 2025 (Finalist)",
      "Organized TEDxIIITJabalpur as Technical Head"
    ],
    technicalSkills: {
      Languages: "C++, Python, JavaScript, SQL",
      "Web Development": "HTML5, CSS3, React, Node.js, Express",
      Databases: "MongoDB, PostgreSQL, Firebase",
      Tools: "Git, Docker, VS Code, Postman",
      Frameworks: "Tailwind CSS, Bootstrap, Material-UI"
    }
  }); // ✅ this is now correct
  

  const onSubmit = (data) => {
    setIsSubmitting(true);
    try {
        console.log(resumeData);
      const formattedProjects = (data.project || []).map(p => ({
        ...p,
        points: p.description
          ? p.description.split('\n').map(line => line.trim()).filter(Boolean)
          : []
      }));

      const resumeFormatted = {
        ...data,
        project: formattedProjects,
        skills: data.skills || ''
      };

      setSuccessMessage('Resume data saved successfully!');
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Personal Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
        {['name', 'email', 'phone', 'linkedin', 'github'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              {...register(`personalDetails.${field}`)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
            {errors.personalDetails?.[field] && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Education</h2>
        {[...Array(2)].map((_, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-medium mb-2">Education #{index + 1}</h3>
            {['degree', 'course', 'university', 'location', 'cpi', 'spi'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                <input
                  {...register(`education.${index}.${field}`)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder={field.toUpperCase()}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Year</label>
              <input {...register(`education.${index}.startyear`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" type="text" placeholder="2023" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Year</label>
              <input {...register(`education.${index}.endyear`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" type="text" placeholder="2027" />
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Skills</h2>
        <label className="block text-sm font-medium text-gray-700">Technical Skills (Comma-Separated)</label>
        <input {...register(`skills`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="React, Node.js, MongoDB" />
      </div>

      {/* Projects */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-medium mb-2">Project #{index + 1}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input {...register(`project.${index}.name`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Project Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description (Use new lines for bullet points)</label>
              <textarea {...register(`project.${index}.description`)} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="• Built UI with React&#10;• Integrated MongoDB&#10;• Deployed to Netlify" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input {...register(`project.${index}.starttime`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="April, 2025" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input {...register(`project.${index}.endtime`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="May, 2025" />
            </div>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-medium mb-2">Company #{index + 1}</h3>
            {['name', 'role', 'description', 'starttime', 'endtime'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                <input
                  {...register(`work.${index}.${field}`)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Submit & Download */}
      <button onSubmit={onSubmit} type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:bg-blue-400">
        {isSubmitting ? 'Saving...' : 'Save Resume'}
      </button>

      {resumeData && (
        <PDFDownloadLink document={<ResumePDF resumeData={resumeData} />} fileName="resume.pdf" className='pdf-download-link'>
          {({ loading }) => (
            <button className={`ml-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          )}
        </PDFDownloadLink>
      )}

      {successmessage && <div className="text-green-500 mt-4">{successmessage}</div>}
    </form>
  );
};

export default Form;