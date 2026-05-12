import React from 'react'
import styles from "./HS3RIGHTSIDE.module.css"
const HS3RIGHTSIDE = () => {
  return (
    <div>
        <div className={styles.guideSection}>
  {/* LEFT VIDEO */}
  <div className={styles.videoBox}>
<video autoPlay muted loop controls>
<source src="/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* RIGHT SIDE GUIDE TEXT */}
  <div className={styles.guideText}>
    <h2>How to Use This Website</h2>

    <ul>
      <li>Upload your resume using the upload box.</li>
      <li>AI automatically analyzes your resume.</li>
      <li>You will get strengths, issues, score & suggestions.</li>
      <li>Prepare your resume according to the given feedback.</li>
      <li>Download or update your resume instantly.</li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default HS3RIGHTSIDE