import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Wrapper, Section } from "../assets/wrappers/ResumeBuilder";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// Define the styles for the resume template
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f8f9fa",
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 3px rgba(0,0,0,0.1)",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#2c3e50",
    borderBottom: "1px solid #34495e",
    paddingBottom: 5,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#34495e",
  },
  text: {
    fontSize: 12,
    color: "#2c3e50",
    lineHeight: 1.5,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2980b9",
  },
  link: {
    fontSize: 12,
    color: "#2980b9",
    textDecoration: "underline",
  },
  achievements: {
    fontSize: 12,
    color: "#27ae60",
  },
});

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/resume");    
    return { data };
  } catch (error) {
    toast.error("Failed to load data.");
    return redirect("/");
  }
};

const ResumeBuilder = () => {
  const { data} = useLoaderData();
  // console.log(data)
  
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [summary, setSummary] = useState("");
  
  const [education, setEducation] = useState([
    { degree: "", institution: "", year: "" },
  ]);
  
  const [projects, setProjects] = useState([
    { title: "", description: "", link: "" },
  ]);

  const [achievements, setAchievements] = useState([""]);

  const [certifications, setCertifications] = useState([
    { name: "", institution: "", year: "" },
  ]);
  
  const [skills, setSkills] = useState([""]);
  
  const saveHandler=async()=>{
    const response=await customFetch.post("/resume",{personalInfo,summary,education,projects,achievements,certifications,skills})
    toast.success("Resume saved successfully")
    
  }
  // console.log("first here")
  useEffect(() => {
    if (data.data[0]) {
      setPersonalInfo(data.data[0].personalInfo || {});
      setSummary(data.data[0].summary || "");
      setEducation(
        data.data[0].education || [{ degree: "", institution: "", year: "" }]
      );
      setProjects(data.data[0].projects || [{ title: "", description: "", link: "" }]);
      setAchievements(data.data[0].achievements || [""]);
      setCertifications(
        data.data[0].certifications || [{ name: "", institution: "", year: "" }]
      );
      setSkills(data.data[0].skills || [""]);
    }
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }]);
  };

  const removeEducation = (index) => {
    const newEdu = [...education];
    newEdu.splice(index, 1);
    setEducation(newEdu);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", link: "" }]);
  };

  const removeProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  const removeAchievement = (index) => {
    const newAchievements = [...achievements];
    newAchievements.splice(index, 1);
    setAchievements(newAchievements);
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { name: "", institution: "", year: "" },
    ]);
  };

  const removeCertification = (index) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    setCertifications(newCertifications);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{personalInfo.name}</Text>
          <Text style={styles.text}>{personalInfo.email}</Text>
          <Text style={styles.text}>{personalInfo.phone}</Text>
          <Text style={styles.text}>{personalInfo.address}</Text>
        </View>

        {summary && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.subheader}>Education</Text>
          {education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.text}>
                {edu.degree} - {edu.institution} ({edu.year})
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Projects</Text>
          {projects.map((proj, index) => (
            <View key={index}>
              <Text style={styles.projectTitle}>{proj.title}</Text>
              <Text style={styles.text}>{proj.description}</Text>
              {proj.link && <Text style={styles.link}>Link: {proj.link}</Text>}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Achievements</Text>
          {achievements.map((achievement, index) => (
            <Text key={index} style={styles.achievements}>
              {achievement}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Certifications</Text>
          {certifications.map((cert, index) => (
            <View key={index}>
              <Text style={styles.text}>
                {cert.name} - {cert.institution} ({cert.year})
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Skills</Text>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.text}>
              {skill}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <Wrapper>
      <h2>Resume Builder</h2>
      <form>
        <Section>
          <h3>Personal Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={personalInfo.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={personalInfo.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={personalInfo.address}
            onChange={handleInputChange}
          />
        </Section>

        <Section>
          <h3>Summary</h3>
          <textarea
            placeholder="A brief summary about yourself"
            value={summary}
            onChange={handleSummaryChange}
          />
        </Section>

        <Section>
          <h3>Education</h3>
          {education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...education];
                  newEdu[index].degree = e.target.value;
                  setEducation(newEdu);
                }}
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => {
                  const newEdu = [...education];
                  newEdu[index].institution = e.target.value;
                  setEducation(newEdu);
                }}
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => {
                  const newEdu = [...education];
                  newEdu[index].year = e.target.value;
                  setEducation(newEdu);
                }}
              />
              <button type="button" onClick={() => removeEducation(index)}>
                Remove Education
              </button>
            </div>
          ))}
          <button type="button" onClick={addEducation}>
            Add Education
          </button>
        </Section>

        <Section>
          <h3>Projects</h3>
          {projects.map((proj, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[index].title = e.target.value;
                  setProjects(newProjects);
                }}
              />
              <textarea
                placeholder="Project Description"
                value={proj.description}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[index].description = e.target.value;
                  setProjects(newProjects);
                }}
              />
              <input
                type="text"
                placeholder="Project Link"
                value={proj.link}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[index].link = e.target.value;
                  setProjects(newProjects);
                }}
              />
              <button type="button" onClick={() => removeProject(index)}>
                Remove Project
              </button>
            </div>
          ))}
          <button type="button" onClick={addProject}>
            Add Project
          </button>
        </Section>

        <Section>
          <h3>Achievements</h3>
          {achievements.map((achievement, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Achievement"
                value={achievement}
                onChange={(e) => {
                  const newAchievements = [...achievements];
                  newAchievements[index] = e.target.value;
                  setAchievements(newAchievements);
                }}
              />
              <button type="button" onClick={() => removeAchievement(index)}>
                Remove Achievement
              </button>
            </div>
          ))}
          <button type="button" onClick={addAchievement}>
            Add Achievement
          </button>
        </Section>

        <Section>
          <h3>Certifications</h3>
          {certifications.map((cert, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => {
                  const newCertifications = [...certifications];
                  newCertifications[index].name = e.target.value;
                  setCertifications(newCertifications);
                }}
              />
              <input
                type="text"
                placeholder="Institution"
                value={cert.institution}
                onChange={(e) => {
                  const newCertifications = [...certifications];
                  newCertifications[index].institution = e.target.value;
                  setCertifications(newCertifications);
                }}
              />
              <input
                type="text"
                placeholder="Year"
                value={cert.year}
                onChange={(e) => {
                  const newCertifications = [...certifications];
                  newCertifications[index].year = e.target.value;
                  setCertifications(newCertifications);
                }}
              />
              <button type="button" onClick={() => removeCertification(index)}>
                Remove Certification
              </button>
            </div>
          ))}
          <button type="button" onClick={addCertification}>
            Add Certification
          </button>
        </Section>

        <Section>
          <h3>Skills</h3>
          {skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = e.target.value;
                  setSkills(newSkills);
                }}
              />
              <button type="button" onClick={() => removeSkill(index)}>
                Remove Skill
              </button>
            </div>
          ))}
          <button type="button" onClick={addSkill}>
            Add Skill
          </button>
        </Section>
      </form>
        <button type="button" onClick={saveHandler}>Save</button> <br />
      <PDFDownloadLink document={<MyDocument />} fileName="resume.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </Wrapper>
  );
};

export default ResumeBuilder;

