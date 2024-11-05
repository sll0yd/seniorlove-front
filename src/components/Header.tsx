import { useState } from 'react';
import type { FormEvent } from 'react';
import { z } from 'zod';
import axios from 'axios';

// Define the type for the sign up form data
type SignUpFormData = {
  gender: string;
  userName: string;
  age: number | ''; // To keep placeholder empty
  email: string;
  password: string;
};

// Zod schema for sign up form data
const signUpSchema = z.object({
  gender: z.enum(['H', 'F'], {
    required_error: 'Le genre est requis',
  }),
  // The user name must be at least 1 character long
  userName: z.string().min(1, "Le nom d'utilisateur est requis"),
  // The age must be at least 60 years
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(60, 'Vous devez avoir au moins 60 ans'),
  ),
  // The email must be a valid email address
  email: z.string().email('Adresse email invalide'),
  // The password must be at least 6 characters long
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

function Header() {
  // State to store the form data
  const [formData, setFormData] = useState<SignUpFormData>({
    gender: '',
    userName: '',
    age: '',
    email: '',
    password: '',
  });
  // State to store error messages
  const [errorMessages, setErrorMessages] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the name and value from the input element
    const { name, value } = event.target;
    // Update the form data state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Validate the form data
    const validationResult = signUpSchema.safeParse(formData);
    // If the validation fails, set the error messages and return
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0].message;
      setErrorMessages(firstError);
      return;
    }

    // Submit the form data
    try {
      // Send a POST request to the signup API endpoint
      const response = await axios.post(
        'http://localhost:3000/api/signup',
        validationResult.data,
      );
      console.log('Form submitted successfully:', response.data);
      setErrorMessages(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessages("Une erreur s'est produite lors de l'inscription");
    }
  };

  return (
    <header>
      <div className="relative w-full min-h-[720px]">
        <div className="absolute inset-0">
          <img
            src="/images/coupleheureux.JPG"
            alt="Couple heureux"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full h-full flex items-center justify-start pt-20">
          <div className="ml-8 md:ml-12 w-full max-w-sm">
            <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-6">
                INSCRIVEZ-VOUS
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessages && (
                  <p className="text-red-500 text-center">{errorMessages}</p>
                )}
                <fieldset>
                  <legend className="mb-2">Je suis</legend>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        id="gender-femme"
                        type="radio"
                        name="gender"
                        value="F"
                        checked={formData.gender === 'F'}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <label htmlFor="gender-femme">Femme</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="gender-homme"
                        type="radio"
                        name="gender"
                        value="H"
                        checked={formData.gender === 'H'}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <label htmlFor="gender-homme">Homme</label>
                    </div>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="userName" className="block mb-1 text-sm">
                    Nom d'utilisateur:
                  </label>
                  <input
                    id="userName"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="votre nom d'utilisateur"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block mb-1 text-sm">
                    Votre âge:
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="votre âge"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 text-sm">
                    Adresse email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre adresse email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-1 text-sm">
                    Choisissez un mot de passe:
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="votre mot de passe"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-6"
                >
                  M'INSCRIRE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
