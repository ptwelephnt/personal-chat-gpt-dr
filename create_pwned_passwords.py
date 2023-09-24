import json
# Open and read the file
def read_passwords(file_path):
    password_list = []
    with open(file_path, 'r') as file:
        lines = file.readlines()

        # Process frequency data section
        in_frequency_data = False
        for line in lines:
            line = line.strip()
            if line.startswith("#frequency:sha1-hash:plain"):
                in_frequency_data = True
            elif in_frequency_data and line:
                parts = line.split(':')
                if len(parts) == 3:
                    plain_password = parts[2]
                    password_list.append(plain_password)
    
    return password_list

def create_json_file(password_list, output_file_path):
    # Create a dictionary with a key for the password list
    data = {"passwords": password_list}

    # Write the dictionary to a JSON file
    with open(output_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)  

if __name__ == '__main__':
    file_path = './pwned_passwords.txt'
    password_list = read_passwords(file_path)
    output_file_path = './passwords.json'
    create_json_file(password_list, output_file_path)

    print(f"JSON file '{output_file_path}' created with {len(password_list)} passwords.")
