import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-top-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styles: `
  :root {
            --primary-bg: #0f172a;
            --secondary-bg: #1e293b;
            --accent-blue: #0ea5e9;
            --accent-amber: #f59e0b;
            --text-primary: #f8fafc;
            --text-secondary: #cbd5e1;
            --glass-bg: rgba(255, 255, 255, 0.08);
            --border-color: rgba(14, 165, 233, 0.2);
            --shadow-color: rgba(0, 0, 0, 0.3);
        }

        .navbar-custom {
            background: linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 100%);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 4px 20px var(--shadow-color);
            min-height: 72px;
            will-change: transform;
            contain: layout style paint;
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.6rem;
            color: var(--text-primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: color 0.2s ease;
            will-change: transform;
        }

        .navbar-brand:hover {
            color: var(--accent-amber);
            transform: translateY(-1px);
        }

        .navbar-brand i {
            font-size: 1.8rem;
            color: var(--accent-blue);
            transition: color 0.2s ease;
        }

        .navbar-brand:hover i {
            color: var(--accent-amber);
        }

        .navbar-nav .nav-link {
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 0.9rem;
            padding: 10px 16px !important;
            margin: 0 4px;
            border-radius: 8px;
            transition: all 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            will-change: transform;
            text-decoration: none;
        }

        .navbar-nav .nav-link:hover,
        .navbar-nav .nav-link.active {
            color: var(--text-primary) !important;
            background-color: var(--glass-bg);
            transform: translateY(-1px);
        }

        .navbar-nav .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            width: 4px;
            height: 4px;
            background: var(--accent-blue);
            border-radius: 50%;
            transform: translateX(-50%);
        }

        .dropdown-menu {
            background: var(--secondary-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow: 0 8px 25px var(--shadow-color);
            margin-top: 8px;
            padding: 8px;
        }

        .dropdown-item {
            color: var(--text-secondary);
            padding: 10px 16px;
            transition: all 0.2s ease;
            border-radius: 6px;
            margin: 2px 0;
            font-weight: 500;
        }

        .dropdown-item:hover {
            color: var(--text-primary);
            background-color: var(--glass-bg);
            transform: translateX(4px);
        }

        .dropdown-divider {
            border-color: var(--border-color) !important;
            opacity: 0.6;
        }

        .navbar-toggler {
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 8px 10px;
            background: var(--glass-bg);
            transition: all 0.2s ease;
        }

        .navbar-toggler:hover {
            background: var(--accent-blue);
            border-color: var(--accent-blue);
        }

        .navbar-toggler:focus {
            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
        }

        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2814, 165, 233, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        .navbar-toggler:hover .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        .search-form {
            position: relative;
            max-width: 280px;
        }

        .search-input {
            background: var(--glass-bg);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 8px 16px 8px 40px;
            color: var(--text-primary);
            width: 100%;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }

        .search-input:focus {
            background: rgba(255, 255, 255, 0.12);
            border-color: var(--accent-blue);
            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
            outline: none;
        }

        .search-input::placeholder {
            color: var(--text-secondary);
        }

        .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--accent-blue);
            font-size: 0.9rem;
        }

        .btn-cta {
            background: linear-gradient(135deg, var(--accent-amber), #d97706);
            border: none;
            border-radius: 20px;
            padding: 8px 20px;
            color: white;
            font-weight: 600;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.2s ease;
            will-change: transform;
        }

        .btn-cta:hover {
            background: linear-gradient(135deg, #d97706, var(--accent-amber));
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        @media (max-width: 768px) {
            .navbar-nav .nav-link {
                padding: 12px 20px !important;
                margin: 4px 0;
                font-size: 0.9rem;
                border-radius: 8px;
            }
            
            .navbar-nav .nav-link.active::after {
                display: none;
            }

            .navbar-nav .nav-link.active {
                background-color: var(--accent-blue);
                color: white !important;
            }
            
            .search-form {
                margin: 15px 0;
                max-width: 100%;
                display: flex !important;
                flex-direction: column;
                gap: 10px;
            }

            .navbar-brand {
                font-size: 1.4rem;
            }

            .navbar-brand i {
                font-size: 1.6rem;
            }

            .navbar-collapse {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid var(--border-color);
            }
        }

        /* Estilos para el usuario logueado */
        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
            color: var(--text-primary);
        }

        .user-badge {
            background: var(--glass-bg);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .logout-btn {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border: none;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .logout-btn:hover {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
  
  `,
})
export class TopBarComponent {
  private router = inject(Router);

  mainLinks = input.required<
    {
      name: string;
      url: string;
      icon: string;
    }[]
  >();

  email = signal<string>('??');

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.email.set(email);
  }

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
