const pool = require("../src/config/database");
const bcrypt = require("bcrypt");
const { deleteFile } = require("../utils/deleteFile.js");
exports.listCandidate = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT u.id,u.name,u.email,u.role,u.is_active,u.mobile,u.resume,c.id as candidate_id, c.user_id, c.con_status, c.interview_stage, c.joining_cycle, c.post_joining, c.remarks FROM users as u left join candidates as c on u.id = c.user_id  where u.role='Job Seeker'"
  );
  res.json(rows);
};



exports.updateUser = async (req, res) => {
    // console.log("srcfsafsarfsrf");
    
  try {
    const { id } = req.params;
    const { name, email, mobile, password, role, is_active } = req.body;

    // 1️⃣ Check user exists
    const [user] = await pool.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2️⃣ Check email uniqueness (exclude current user)
    const [emailCheck] = await pool.query(
      "SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1",
      [email, id]
    );

    if (emailCheck.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 3️⃣ Check mobile uniqueness (exclude current user)
    const [mobileCheck] = await pool.query(
      "SELECT id FROM users WHERE mobile = ? AND id != ? LIMIT 1",
      [mobile, id]
    );

    if (mobileCheck.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Mobile already exists",
      });
    }

    // 4️⃣ Hash password if provided
    let updateFields = `
      name = ?, email = ?, mobile = ?, role = ?, is_active = ?
    `;
    let updateValues = [name, email, mobile, role, is_active];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields += `, password = ?`;
      updateValues.push(hashedPassword);
    }

    updateValues.push(id);

    // 5️⃣ Update user
    await pool.query(
      `UPDATE users SET ${updateFields} WHERE id = ?`,
      updateValues
    );

    return res.json({
      success: true,
      message: "User updated successfully",
    });

  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("idid",id);
    
    const [user] = await pool.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await pool.query("DELETE FROM users WHERE id = ?", [id]);

    return res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting user",
    });
  }
};


exports.createCandidate = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Form data not received",
            });
        }

        const { name, email, mobile, password, role } = req.body;
        const resumeFilename = req.file ? req.file.filename : null;
        const resumePath = req.file ? req.file.path : null;

        if (!resumePath) {
            return res.status(400).json({
                success: false,
                message: "Resume is required",
            });
        }

        // Check email
        const [existing] = await pool.query(
            "SELECT id FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (existing.length > 0) {
            deleteFile(resumePath);
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Check mobile
        const [checkMobile] = await pool.query(
            "SELECT id FROM users WHERE mobile = ? LIMIT 1",
            [mobile]
        );

        if (checkMobile.length > 0) {
             deleteFile(resumePath);
            return res.status(409).json({
                success: false,
                message: "Mobile already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO users (name, email, mobile, password, role, resume)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, mobile, hashedPassword, role, resumeFilename]
        );

        res.status(201).json({
            success: true,
            message: "Candidate registered successfully",
        });
    } catch (error) {
        console.error("Create Candidate Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating candidate",
        });
    }
};


exports.toggleStatus = async (req, res) => {
  try {
        await pool.query(
            "UPDATE users SET is_active = !is_active WHERE id=?",
            [req.params.id]
        );
        res.json({ message: "Status updated" });
  } catch (error) {
        console.error("Create User Error:", error);

        return res.status(500).json({
        success: false,
        message: "Something went wrong while update user",
        });
    }
};
